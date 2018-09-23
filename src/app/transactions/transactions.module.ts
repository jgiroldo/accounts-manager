import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { TransfersComponent } from './transfers/transfers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule, MatButtonModule, MatFormFieldModule, MatSelectModule,
  MatAutocompleteModule, MatProgressSpinnerModule, MatIconModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';
import { TableModule } from 'primeng/table';
@NgModule({
  imports: [
    CommonModule,
    TableModule,
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
  declarations: [TransactionsComponent, TransfersComponent]
})
export class TransactionsModule { }
