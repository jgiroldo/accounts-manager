import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { AccountsRegistrationComponent } from './accounts-registration.component';

export const AccountRoutes: Routes = [
  {
    path: 'accounts',
    component: AccountsComponent,
  },
  {
    path: 'accounts/new',
    component: AccountsRegistrationComponent,
  },
  {
    path: 'accounts/:id',
    component: AccountsRegistrationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AccountRoutes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
