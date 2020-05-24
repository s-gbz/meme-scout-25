import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemeView as MemeView } from './meme-view.component';

const routes: Routes = [
  {
    path: '',
    component: MemeView,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemeViewRoutingModule {}
