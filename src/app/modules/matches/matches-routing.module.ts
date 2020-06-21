import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Matches } from './matches.component';

const routes: Routes = [
  {
    path: '',
    component: Matches
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesRoutingModule {}
