import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
