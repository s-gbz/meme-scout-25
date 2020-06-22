import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MatchComponent } from './match.component';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {
    path: '',
    component: MatchComponent
  },
  {
    path: ':matchId',
    component: MessageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MatchComponent, MessageComponent]
})
export class MatchModule {}
