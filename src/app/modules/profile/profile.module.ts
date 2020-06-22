import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyMemesComponent } from './my-memes/my-memes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProfileComponent },
  { path: 'my-memes', component: MyMemesComponent },
];

@NgModule({
  declarations: [
    ProfileComponent,
    MyMemesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProfileComponent, MyMemesComponent
  ]
})
export class ProfileModule { }
