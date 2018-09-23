import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './services/http.service';
import { AlertService } from './services/alert.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  array = [
    { '--mainBackground': '#eaeaea' },
    { '--filterBackground': '#cacaca' },
    { '--masterAccountColor': '#F00' },
    { '--tableHeaderColor': '#FFF'},
    { '--tableHeaderBackground': '#F00'},
    { '--btnRaisedBackground': '#F00'},
    { '--btnRaisedColor': '#FFF' },
    { '--btnRaisedRadius': '10px' },
    { '--btnStrokedBackground': '#eaeaea'},
    { '--btnStrokedColor': '#F00' },
    { '--btnStrokedRadius': '10px' },
    { '--materialFormFocusColor': '#555555' },
    { '--crudBackground': '#e4e4e4' },
    { '--crudRadius': '10px' },

  ];
  constructor(private translate: TranslateService, private theme : ThemeService) {
  }

  ngOnInit() {
    this.theme.setTheme(this.array);
    this.translate.setDefaultLang('shared.pt-BR');
  }
}
