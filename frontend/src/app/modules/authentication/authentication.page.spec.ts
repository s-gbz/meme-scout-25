import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationPage } from './authentication.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

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
        RouterTestingModule
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
