import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyMemesComponent } from './my-memes.component';

describe('MyMemesComponent', () => {
  let component: MyMemesComponent;
  let fixture: ComponentFixture<MyMemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMemesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyMemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
