import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validation } from 'src/app/shared/validation';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createProfileForm();
  }
  
  createProfileForm() {
    this.profileForm = this.fb.group({
      bio: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      aboutme: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
    })
  }

  submitProfileFormBio() {
    // TODO: Adapt registration process with API
    console.log(this.profileForm.value);
  }
}
