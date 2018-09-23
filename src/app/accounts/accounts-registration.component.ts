import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { Account } from '../models/account.model';
import { Person } from '../models/person.model';
import { HttpParams } from '@angular/common/http';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Observable } from 'node_modules/rxjs';

@Component({
  selector: 'app-accounts-registration',
  templateUrl: './accounts-registration.component.html',
  styleUrls: ['./accounts-registration.component.scss']
})
export class AccountsRegistrationComponent implements OnInit {
  accountFG: FormGroup;
  accountVM: Account;
  selectedParent: Account;
  selectedPerson: Person;
  statusList: any;
  personCtrl = new FormControl();
  accountCtrl = new FormControl();
  filteredPersonsAC: any;
  filteredAccountsAC: any;
  lastPersonStr: string;
  lastAccountStr: string;
  isAcPersonLoading: boolean;
  isAcAccountLoading: boolean;
  constructor(
    public route: ActivatedRoute,
    private alertService: AlertService,
    private translateSvc: TranslateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpService

  ) {
    this.personCtrl = new FormControl();
    this.accountCtrl = new FormControl();
    this.personCtrl
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isAcPersonLoading = true),
        switchMap(value => this.httpService.doGet(environment.persons_url, { params: new HttpParams().set('name', value ? value : '') })
          .pipe(
            finalize(() => this.isAcPersonLoading = false),
        )
        )
      )
      .subscribe(persons => this.filteredPersonsAC = persons);
    this.accountCtrl
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isAcAccountLoading = true),
        switchMap(value => this.httpService.doGet(environment.accounts_url, { params: new HttpParams().set('name', value ? value : '') })
          .pipe(
            finalize(() => this.isAcAccountLoading = false),
        )
        )
      )
      .subscribe(accounts => this.filteredAccountsAC = accounts);
  }

  ngOnInit() {
    const routeID = this.route.snapshot.params.id;
    if (routeID) {
      this.httpService.doGet(environment.accounts_url + '/' + routeID).subscribe(
        account => {
          this.accountVM = new Account(account[0]);
          this.selectedPerson = this.accountVM.person;
          if (this.accountVM.parent_account) {
            this.httpService.doGet(environment.accounts_url + '/' + this.accountVM.parent_account).subscribe(
              data => {
                this.selectedParent = new Account(data[0]);
              },
              err => {
                this.alertService.openAlert('error',
                  this.translateSvc.instant('alerts.error_title'),
                  this.translateSvc.instant('alerts.server_error'));
              }
            );
          }
          this.buildForm();
          this.fillDDL();
        },
        err => {
          this.alertService.openAlert('error',
            this.translateSvc.instant('alerts.error_title'),
            this.translateSvc.instant('alerts.server_error'));
        });
    } else {
      this.accountVM = new Account({});
      this.accountVM.status = 1;
      this.fillDDL();
      this.buildForm();
    }
  }

  buildForm() {
    this.accountFG = this.formBuilder.group({
      'parent_account': [this.accountVM.parent_account],
      'status': [this.accountVM.status, Validators.required],
      'person': [this.accountVM.person_id, Validators.required],
      'name': [this.accountVM.name, Validators.required]
    });
  }

  fillDDL() {
    this.httpService.doGet(environment.accounts_url + '/account-status').subscribe(
      status => {
        this.statusList = status;
      }, err => {
        this.alertService.openAlert('error',
          this.translateSvc.instant('alerts.error_title'),
          this.translateSvc.instant('alerts.server_error'));
      });
  }

  onPersonSelect(person: any) {
    this.accountVM.person_id = person.id;
    let accountValidator = this.accountFG.get('person');
    accountValidator.setValue(person.id);
    accountValidator.updateValueAndValidity();
  }

  onAccountSelect(account: any) {
    this.accountVM.parent_account = account.id;
  }

  displayPerson(person: Person) {
    if (person) { return person.name; }
  }

  displayParent(account: Person) {
    if (account) { return account.name; }
  }

  submit() {
    let request;
    if (this.accountVM.id) {
      request = this.httpService.doPut(environment.accounts_url + '/' + this.accountVM.id, this.accountVM);
      this.sendRequest(request);
    } else {
      request = this.httpService.doPost(environment.accounts_url, this.accountVM);
      this.sendRequest(request);
    }
  }

  sendRequest(request: any) {
    request.subscribe(
      notification => {
        this.alertService.openAlert('success',
          this.translateSvc.instant('alerts.success_title'),
          this.translateSvc.instant('alerts.server_success'));
        this.router.navigate(['/accounts']);
      },
      error => {
        this.alertService.openAlert('error',
          this.translateSvc.instant('alerts.error_title'),
          this.translateSvc.instant('alerts.save_error'))
      }
    );
  }
}
