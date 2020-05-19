import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationPage } from './authentication.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';

describe('AuthenticationPage', () => {
  let component: AuthenticationPage;
  let fixture: ComponentFixture<AuthenticationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AuthenticationPage
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        RegisterModule,
        LoginModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
