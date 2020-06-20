import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchesRoutingModule } from './matches-routing.module';

import { Matches } from './matches.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchesRoutingModule
  ],
  declarations: [Matches]
})
export class MatchesModule {}
