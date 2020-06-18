import { NgModule } from '@angular/core';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TabsPageRoutingModule,
    RouterModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
