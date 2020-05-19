import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageModule } from './validation-message/validation-message.module';



@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ValidationMessageModule
  ]
})
export class SharedModule { }
