import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountRoutes } from './accounts/accounts.routing';
import { PersonRoutes } from './persons/persons.routing';
import { TransactionsRoutes } from './transactions/transactions.routing';

const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
    },
    ...AccountRoutes,
    ...PersonRoutes,
    ...TransactionsRoutes,
    { path: '**', redirectTo: '' }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: []
})

export class AppRoutingModule { }
