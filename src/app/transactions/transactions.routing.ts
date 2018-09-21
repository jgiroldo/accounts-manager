import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransfersComponent } from './transfers/transfers.component';
import { TransactionsComponent } from './transactions.component';

export const TransactionsRoutes: Routes = [
  {
    path: 'transactions',
    component: TransactionsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'transfers' },
      {
        path: 'transfers',
        component: TransfersComponent,
      },
      {
        path: 'deposit',
        component: TransfersComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(TransactionsRoutes)],
  exports: [RouterModule]
})

export class TransactionsRoutingModule { }
