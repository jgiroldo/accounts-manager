import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { AccountsRegistrationComponent } from './accounts-registration.component';
import { TreeTableModule } from 'primeng/treetable';
import { FormsModule, ReactiveFormsModule } from 'node_modules/@angular/forms';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { TranslateModule, TranslateLoader } from 'node_modules/@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    TreeTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    AccountsComponent,
    AccountsRegistrationComponent
  ]
})
export class AccountsModule { }
