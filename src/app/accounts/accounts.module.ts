import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { AccountsRegistrationComponent } from './accounts-registration.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AccountsComponent,
    AccountsRegistrationComponent
  ]
})
export class AccountsModule { }
