import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsComponent } from './persons.component';
import { PersonsRegistrationComponent } from './persons-registration.component';

export const PersonRoutes: Routes = [
  {
    path: 'persons',
    component: PersonsComponent,
  },
  {
    path: 'persons/new',
    component: PersonsRegistrationComponent,
  },
  {
    path: 'persons/{id}',
    component: PersonsRegistrationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(PersonRoutes)],
  exports: [RouterModule]
})

export class PersonRoutingModule { }
