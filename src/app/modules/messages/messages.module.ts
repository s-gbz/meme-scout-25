import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Messages } from './messages.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { AutosizeModule } from 'ngx-autosize';

const routes: Routes = [
  {
    path: '',
    component: Messages,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    AutosizeModule
  ],
  declarations: [Messages],
})
export class MessagesModule {}
