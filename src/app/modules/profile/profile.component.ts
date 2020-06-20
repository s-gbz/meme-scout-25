import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { UserProfile } from '../../shared/model/user-profile';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  activeProfile: UserProfile = null;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.initializeUserProfileForm();

    this.userService.getProfile().subscribe(
      profile => {
        this.activeProfile = profile;
        this.updateProfileFormValues();
      }
    );
  }
  
  initializeUserProfileForm() {
    this.userProfileForm = this.fb.group({
      biography: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      fact1: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      fact2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      fact3: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    })
  }

  updatetUserProfile() {
    console.log(this.userProfileForm.value);
  
    this.userService.updateProfile(this.userProfileForm.value);
  }

  handleProfilePictureUpload(event) {
    // Upload picture
    // console.log(newProfilePicture);
    const newProfilePicture = event.target.files[0];

    // this.userService.uploadProfilePicture(newProfilePicture).subscribe(
    //   profilePictureUrl => {
    //   // Get url and set as active profile picture
    //     this.updateProfilePictureUrl(profilePictureUrl)
    //   });
    this.userService.uploadSingleProfilePicture(newProfilePicture)
    // .subscribe(
    //   profilePictureUrl => {
    //       // Get url and set as active profile picture
    //       console.log(profilePictureUrl.downloadURL);
          
    //         this.updateProfilePictureUrl(profilePictureUrl.task.snapshot.downloadURL)
    //       });
  }

  private updateProfilePictureUrl(profilePictureUrl: string) {
    this.activeProfile.profilePictureUrl = profilePictureUrl;
    this.userService.updateProfile(this.activeProfile);
  }

  private updateProfileFormValues() {
    this.userProfileForm.controls["biography"].setValue(this.activeProfile.biography);
    this.userProfileForm.controls["fact1"].setValue(this.activeProfile.fact1);
    this.userProfileForm.controls["fact2"].setValue(this.activeProfile.fact2);
    this.userProfileForm.controls["fact3"].setValue(this.activeProfile.fact3);
  }
}
