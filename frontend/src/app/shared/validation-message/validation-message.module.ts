import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ValidationMessageComponent } from './validation-message.component';
import { SharedModule } from '../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ValidationMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ValidationMessageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ValidationMessageModule { }