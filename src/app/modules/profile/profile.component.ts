import { ProfileFacts } from '../../shared/model/profile-facts';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { UserProfile } from '../../shared/model/user-profile';
import { MemeService } from 'src/app/service/meme.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  ProfileFacts = ProfileFacts;
  userProfileForm: FormGroup;
  activeProfile: UserProfile = null;
  fileToUpload: File = null;

  constructor(private fb: FormBuilder, private userService: UserService, private memeService: MemeService) { }

  ngOnInit() {
    this.initializeUserProfileForm();

    this.userService.getProfile().subscribe(
      profile => {
        if (profile === null) {
          this.activeProfile = this.userProfileForm.value;
          this.setDefaultProfilePicture();
          this.updatetUserProfile();
        } else {
          this.activeProfile = profile;
          this.updateProfileFormValues();
        }
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
    this.userService.updateProfile(this.userProfileForm.value);
  }

  uploadMeme(event) {
    this.memeService.uploadMemes(event.target.files);
  }

  handleProfilePictureUpload(event) {
    this.userService.uploadProfilePictureAndUpdateDatabaseEntry(event.target.files[0], this.activeProfile);
  }

  public getUserUploadedMemes() {
    this.memeService.getUserUploadedMemeReferences().subscribe(
      // Requested structure is a nested array = [ [], [] ]
      memeReferenceArrays => {
        const memeReferences = [];

        // Iterate top level to get all arrays
        for (let i = 0; i < memeReferenceArrays.length; i++) {
          const singleMemeReferenceArray = <Array<any>>memeReferenceArrays[i];

          // Iterate every array entry to get values
          for (let j = 0; j < singleMemeReferenceArray.length; j++) {
            memeReferences.push(singleMemeReferenceArray[j]);
          };
        }

        // Request every individual meme by reference
        const memeDownloadUrls = [];
        for (let i = 0; i < memeReferences.length; i++) {
          this.memeService.requestMeme(memeReferences[i]).subscribe(downloadUrl => {
            memeDownloadUrls.push(downloadUrl);
            console.log(downloadUrl);
          });
        }
      });
  }

  logoutUser() {
    this.userService.logout();
  }

  private setDefaultProfilePicture() {
    this.activeProfile.profilePictureUrl = "/assets/happy-smile.svg";
  }

  private updateProfileFormValues() {
    this.userProfileForm.controls["name"].setValue(this.activeProfile.name);
    this.userProfileForm.controls["biography"].setValue(this.activeProfile.biography);
    this.userProfileForm.controls["fact1"].setValue(this.activeProfile.fact1);
    this.userProfileForm.controls["fact2"].setValue(this.activeProfile.fact2);
    this.userProfileForm.controls["fact3"].setValue(this.activeProfile.fact3);
  }
}