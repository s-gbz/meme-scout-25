import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RegisterComponent }
];

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterModule { }
