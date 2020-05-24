import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Messages } from './messages.component';

describe('MessagesComponent', () => {
  let component: Messages;
  let fixture: ComponentFixture<Messages>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Messages],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Messages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
