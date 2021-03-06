import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemeView } from './meme-view.component';

describe('MemeView', () => {
  let component: MemeView;
  let fixture: ComponentFixture<MemeView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemeView],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
