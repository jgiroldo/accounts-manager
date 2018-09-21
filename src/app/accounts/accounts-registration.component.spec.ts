import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsRegistrationComponent } from './accounts-registration.component';

describe('AccountsRegistrationComponent', () => {
  let component: AccountsRegistrationComponent;
  let fixture: ComponentFixture<AccountsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
