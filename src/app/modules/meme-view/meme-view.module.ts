import { NgModule } from '@angular/core';
import { MemeView } from './meme-view.component';

import { MemeViewRoutingModule } from './meme-view-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MemeViewRoutingModule
  ],
  declarations: [MemeView]
})
export class MemeViewModule {}
