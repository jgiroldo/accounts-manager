import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsComponent } from './persons.component';
import { PersonsRegistrationComponent } from './persons-registration.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PersonsComponent, PersonsRegistrationComponent]
})
export class PersonsModule { }
