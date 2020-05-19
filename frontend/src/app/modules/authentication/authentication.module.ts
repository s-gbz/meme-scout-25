import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationPage } from './authentication.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AuthenticationPage
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../authentication/login/login.module').then(m => m.LoginModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    AuthenticationPage
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationPageModule { }