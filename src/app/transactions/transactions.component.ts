import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { Transaction } from '../models/transaction.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  filterObj = new Transaction({});
  transfersList: any;
  filterForm: FormGroup;
  transactionsTypeList: any;

  constructor(private httpService: HttpService, private alert: AlertService, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.filter();
    this.fillDDL();
  }

  buildForm() {
    this.filterForm = this.fb.group({
      'type': [this.filterObj.operation_type],
    });
  }

  filter() {
    const params = new HttpParams().set('operation_type',
      this.filterObj.operation_type && this.filterObj.operation_type != 0 ? this.filterObj.operation_type.toString() : '');

    this.httpService.doGet(environment.transactions_url, { params: params }).subscribe(
      data => {
        this.transfersList = data;
      },
      err => {
        this.alert.openAlert('error', 'Erro', err);
      }
    );
  }

  fillDDL() {
    this.httpService.doGet(environment.accounts_url + '/transaction-types').subscribe(
      data => {
        this.transactionsTypeList = data;
      },
      err => {
        this.alert.openAlert('error', 'Erro', err);
      });
  }

  restore(transaction: Transaction) {
    this.httpService.doPost(environment.accounts_url + '/transfer/chargeback', transaction).subscribe(
      data => {
        this.alert.openAlert('succes', 'Sucesso', 'Estorno realizado');
        this.filter();
      },
      err => {
        this.alert.openAlert('error', 'Erro', err);
      });
  }

  getStatusName(statusId: any) {
    let statusName = '';
    if (this.transactionsTypeList && this.transactionsTypeList.length > 0) {
      let statusObj = this.transactionsTypeList.find(status => status.id == statusId);
      statusName = statusObj.description;
    }
    return statusName;
  }
}
