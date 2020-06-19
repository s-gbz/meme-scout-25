import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { UserProfile } from '../../shared/model/user-profile';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  profile$: Observable<UserProfile>;
  activeProfile: UserProfile = null;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.createProfileForm();

    let profile$ = this.userService.getProfile().subscribe(
      profile => {
        this.activeProfile = profile;
        console.log(this.activeProfile);
        this.profileForm.controls["biography"].setValue(this.activeProfile.biography);
        const factStringTest = "- " + this.activeProfile.fact1 + "\n- " + this.activeProfile.fact2 + "\n- " + this.activeProfile.fact3;
        this.profileForm.controls["aboutMe"].setValue(factStringTest);
      }
    );
  }
  
  createProfileForm() {
    this.profileForm = this.fb.group({
      biography: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      aboutMe: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
    })
  }

  submitProfileFormBio() {
    // TODO: Adapt registration process with API
    console.log(this.profileForm.value);
  
    this.userService.updateProfile(this.profileForm.value);
  }
}
