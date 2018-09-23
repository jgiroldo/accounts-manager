import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from 'node_modules/@angular/router';

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {

  }
  showHeader() {
    return (this.router.url === '/dashboard') ? false : true;
  }

  verifyRoute(route: string) {
    let url = this.router.url.split('/');
    return (url[1] === route) ? true : false;
  }

}
