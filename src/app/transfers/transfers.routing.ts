import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransfersComponent } from './transfers.component';

export const TransferRoutes: Routes = [
  {
    path: 'transfers',
    component: TransfersComponent,
  },
  {
    path: 'deposit',
    component: TransfersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(TransferRoutes)],
  exports: [RouterModule]
})

export class TransferRoutingModule { }
