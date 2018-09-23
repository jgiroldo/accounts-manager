import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransfersComponent } from './transfers/transfers.component';
import { TransactionsComponent } from './transactions.component';

export const TransactionsRoutes: Routes = [
  {
    path: 'transactions',
    component: TransactionsComponent,
  }, {
    path: 'transactions/deposit', pathMatch: 'full',
    component: TransfersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(TransactionsRoutes)],
  exports: [RouterModule]
})

export class TransactionsRoutingModule { }
