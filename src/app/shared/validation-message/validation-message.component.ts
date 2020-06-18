import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'shared-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent implements OnInit {

  @Input() inputField: FormControl;
  @Input() inputName: string;
  
  constructor() { }

  ngOnInit() { }

}
