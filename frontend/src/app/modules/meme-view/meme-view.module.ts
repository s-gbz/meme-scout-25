import { NgModule } from '@angular/core';
import { MemeView } from './meme-view.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MemeViewRoutingModule } from './meme-view-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ExploreContainerComponentModule,
    MemeViewRoutingModule
  ],
  declarations: [MemeView]
})
export class MemeViewModule {}
