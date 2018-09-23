import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Person } from '../models/person.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  filterObj = new Person({});
  personsList: any;
  filterForm: FormGroup;

  constructor(private httpService: HttpService, private alert: AlertService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.filter();
  }

  buildForm() {
    this.filterForm = this.fb.group({
      'name': [this.filterObj.name],
      'social_name': [this.filterObj.social_name],
      'company_name': [this.filterObj.company_name],
    });
  }

  filter() {
    let params = new HttpParams().set('name', this.filterObj.name ? this.filterObj.name : '')
      .set('social_name', this.filterObj.social_name ? this.filterObj.social_name : '')
      .set('company_name', this.filterObj.company_name ? this.filterObj.company_name : '');
    this.httpService.doGet(environment.persons_url, { params: params }).subscribe(
      data => {
        this.personsList = data;
      },
      err => {
        this.alert.openAlert('error', 'alerts.error_title', 'alerts.server_error');
      }
    );
  }

  edit(id: number) {
    this.router.navigate(['/persons/' + id]);
  }
}
