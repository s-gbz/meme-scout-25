import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MatchComponent } from './match.component';
import { Routes, RouterModule } from '@angular/router';
import { MessageModule } from '../message/message.module';

const routes: Routes = [
  {
    path: '',
    component: MatchComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MatchComponent]
})
export class MatchModule {}
