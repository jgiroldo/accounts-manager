import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { TransfersComponent } from './transfers/transfers.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TransactionsComponent, TransfersComponent]
})
export class TransactionsModule { }
