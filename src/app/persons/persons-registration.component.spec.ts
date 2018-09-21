import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsRegistrationComponent } from './persons-registration.component';

describe('PersonsRegistrationComponent', () => {
  let component: PersonsRegistrationComponent;
  let fixture: ComponentFixture<PersonsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
