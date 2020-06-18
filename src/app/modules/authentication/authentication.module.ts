import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationPage } from './authentication.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationPage,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AuthenticationPage,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthenticationModule { }