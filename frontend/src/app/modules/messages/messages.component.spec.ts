import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Messages } from './messages.component';

describe('MessagesComponent', () => {
  let component: Messages;
  let fixture: ComponentFixture<Messages>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Messages],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Messages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
