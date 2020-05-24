import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    ExploreContainerComponentModule,
    [RouterModule.forChild(routes)]
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {}
