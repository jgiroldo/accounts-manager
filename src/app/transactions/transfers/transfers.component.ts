import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Transfer } from '../../models/transfer.model';
import { Account } from '../../models/account.model';
import { AlertService } from '../../services/alert.service';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {
  transferFG: FormGroup;
  transferVM: Transfer;
  selectedSource: Account;
  selectedDestiny: Account;
  sourceCtrl = new FormControl();
  destinyCtrl = new FormControl();
  filteredSource: any;
  filteredDestiny: any;
  isAcSourceLoading: boolean;
  isAcDestinyLoading: boolean;
  transferType: number;

  constructor(
    public route: ActivatedRoute,
    private alertService: AlertService,
    private translateSvc: TranslateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpService

  ) {
    this.sourceCtrl = new FormControl();
    this.destinyCtrl = new FormControl();
    this.sourceCtrl
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isAcSourceLoading = true),
        switchMap(value => this.httpService.doGet(environment.accounts_url, { params: new HttpParams().set('name', value ? value : '') })
          .pipe(
            finalize(() => this.isAcSourceLoading = false),
        )
        )
      )
      .subscribe(persons => this.filteredSource = persons);
    this.destinyCtrl
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isAcDestinyLoading = true),
        switchMap(value => this.httpService.doGet(environment.accounts_url, { params: new HttpParams().set('name', value ? value : '') })
          .pipe(
            finalize(() => this.isAcDestinyLoading = false),
        )
        )
      )
      .subscribe(accounts => this.filteredDestiny = accounts);
  }

  ngOnInit() {
    this.transferType = 1;
    this.transferVM = new Transfer({});
    this.buildForm();
  }

  buildForm() {
    this.transferFG = this.formBuilder.group({
      'source_account': [this.transferVM.source_id, Validators.required],
      'destiny_account': [this.transferVM.destiny_id, Validators.required],
      'value': [this.transferVM.value, Validators.compose([Validators.required, Validators.min(0.1)])],
    });
  }

  onSourceSelect(source: any) {
    this.transferVM.source_id = source.id;
    let sourceValidator = this.transferFG.get('source_account');
    sourceValidator.setValue(source.id);
    sourceValidator.updateValueAndValidity();
  }

  onDestinySelect(destiny: any) {
    this.transferVM.destiny_id = destiny.id;
    let destinyValidator = this.transferFG.get('destiny_account');
    destinyValidator.setValue(destiny.id);
    destinyValidator.updateValueAndValidity();
  }

  displaySource(account: Account) {
    if (account) { return account.name; }
  }

  displayDestiny(account: Account) {
    if (account) { return account.name; }
  }

  onTypeChange(type: number) {
    let sourceValidator = this.transferFG.get('source_account');
    if (type === 1) {
      sourceValidator.setValidators(null);
    } else {
      sourceValidator.setValidators([Validators.required]);
    }
    sourceValidator.updateValueAndValidity();
  }

  submit() {
    this.httpService.doPost(environment.accounts_url + '/transfer', this.transferVM).subscribe(
      notification => {
        this.alertService.openAlert('success',
          this.translateSvc.instant('shared.alert.success_title'),
          this.translateSvc.instant('alerts.success'));
        this.router.navigate(['/transactions']);
      },
      error => {
        this.alertService.openAlert('error',
          this.translateSvc.instant('shared.alert.error_title'),
          this.translateSvc.instant('shared.alert.save_error'));
      }
    );
  }
}
