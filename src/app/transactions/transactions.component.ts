import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transfersList: any;

  constructor(private httpService: HttpService, private alert: AlertService) { }

  ngOnInit() {
    this.filter();
  }

  filter() {
    this.httpService.doGet(environment.transactions_url).subscribe(
      data => {
        this.transfersList = data;
      },
      err => {
        this.alert.openAlert('error', 'Erro', err);
      }
    );
  }

}