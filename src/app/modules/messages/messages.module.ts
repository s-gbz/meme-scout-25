import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Messages } from './messages.component';

import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: Messages,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Messages]
})
export class MessagesModule {}