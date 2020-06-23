import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MySavedMemesComponent } from './my-saved-memes.component';

describe('MySavedMemesComponent', () => {
  let component: MySavedMemesComponent;
  let fixture: ComponentFixture<MySavedMemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySavedMemesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MySavedMemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
