import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Matches } from './matches.component';

describe('Matches', () => {
  let component: Matches;
  let fixture: ComponentFixture<Matches>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Matches ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Matches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
