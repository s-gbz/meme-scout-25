import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { AutosizeModule } from 'ngx-autosize';

const routes: Routes = [
  {
    path: ':matchId',
    component: MessageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    AutosizeModule
  ],
  declarations: [MessageComponent],
  exports: [MessageComponent]
})
export class MessageModule {}
