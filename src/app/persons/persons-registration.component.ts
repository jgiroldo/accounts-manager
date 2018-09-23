import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { Person } from '../models/person.model';
import { CpfCnpjValidator } from '../shared/validators/cpf_cnpj_validator';

@Component({
  selector: 'app-persons-registration',
  templateUrl: './persons-registration.component.html',
  styleUrls: ['./persons-registration.component.css']
})
export class PersonsRegistrationComponent implements OnInit {
  personFG: FormGroup;
  personVM: Person;
  personType = 1;
  personTypeList = [
    { id: 1, description: 'phisical' },
    { id: 2, description: 'legal' }
  ];

  constructor(
    public route: ActivatedRoute,
    private alertService: AlertService,
    private translateSvc: TranslateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpService

  ) { }

  ngOnInit() {
    const routeID = this.route.snapshot.params.id;
    if (routeID) {
      this.httpService.doGet(environment.persons_url + '/' + routeID).subscribe(
        person => {
          this.personVM = new Person(person[0]);
          this.buildForm();
        },
        err => {
          this.alertService.openAlert('error',
            this.translateSvc.instant('shared.alert.error_title'),
            this.translateSvc.instant('shared.alert.server_error'));
        });
    } else {
      this.personVM = new Person({});
      this.buildForm();
    }
  }

  buildForm() {
    this.personFG = this.formBuilder.group({
      'cpf_cnpj': [this.personVM.cpf_cnpj, Validators.compose([Validators.required,
        Validators.maxLength(18), CpfCnpjValidator.validateCNPJorCPF])],
      'name': [this.personVM.name, Validators.required],
      'birth_date': [this.personVM.birth_date, Validators.required],
      'company_name': [this.personVM.company_name],
      'social_name': [this.personVM.social_name]
    });
  }

  onPersonTypeChange(type: number) {
    let nameValidator = this.personFG.get('name');
    let companyNameValidator = this.personFG.get('company_name');
    let socialNameValidator = this.personFG.get('social_name');
    if (type == 1) { //phisical person
      nameValidator.setValidators([Validators.required]);
      companyNameValidator.setValidators(null);
      socialNameValidator.setValidators(null);
    } else {
      nameValidator.setValidators(null);
      companyNameValidator.setValidators([Validators.required]);
      socialNameValidator.setValidators([Validators.required]);
    }
  }

  submit() {
    let request;
    if (this.personVM.id) {
      request = this.httpService.doPut(environment.persons_url + '/' + this.personVM.id, this.personVM);
      this.sendRequest(request);
    } else {
      request = this.httpService.doPost(environment.persons_url, this.personVM);
      this.sendRequest(request);
    }
  }

  sendRequest(request: any) {
    request.subscribe(
      notification => {
        this.alertService.openAlert('success',
          this.translateSvc.instant('shared.alert.success_title'),
          this.translateSvc.instant('alerts.success'));
        this.router.navigate(['/persons']);
      },
      error => {
        this.alertService.openAlert('error',
          this.translateSvc.instant('shared.alert.error_title'),
          this.translateSvc.instant('shared.alert.save_error'))
      }
    );
  }
}
