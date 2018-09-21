import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private service: HttpService) { }

  ngOnInit() {
    this.service.doGet('http://localhost:9015/api/account').subscribe(data => {
      debugger;
    },
      err => {
        debugger;
      })
  }

}
