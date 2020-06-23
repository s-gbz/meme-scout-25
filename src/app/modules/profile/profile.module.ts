import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyMemesComponent } from './my-memes/my-memes.component';
import { MySavedMemesComponent } from './my-saved-memes/my-saved-memes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProfileComponent },
  { path: 'my-memes', component: MyMemesComponent },
  { path: 'my-saved-memes', component: MySavedMemesComponent },
];

@NgModule({
  declarations: [
    ProfileComponent,
    MyMemesComponent,
    MySavedMemesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProfileComponent, MyMemesComponent, MySavedMemesComponent
  ]
})
export class ProfileModule { }
