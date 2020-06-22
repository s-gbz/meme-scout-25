import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertMessage } from './alert-message.component';

describe('AlertMessage', () => {
  let component: AlertMessage;
  let fixture: ComponentFixture<AlertMessage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertMessage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
