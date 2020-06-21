import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/model/user';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, finalize } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { UrlConfig } from '../url.config';
import { auth } from 'firebase';
import { UserProfile } from '../shared/model/user-profile';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  authStatus = new BehaviorSubject<firebase.User>(null);
  authenticatedUser: firebase.User;
  private storageRef = this.afStore.storage;


  constructor(private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase, 
    private afStore: AngularFireStorage) { }


  public register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user: auth.UserCredential) => this.authenticateUser(user))
      .catch(error => console.error(error));
  }

  public login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user: auth.UserCredential) => this.authenticateUser(user))
      .catch(error => console.error(error));
  }

  public loginWithGoogle(): Promise<any> {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider)
      .then((user: auth.UserCredential) => this.authenticateUser(user))
      .catch(error => console.error(error));
  }

  public loginWithGithub(): Promise<any> {
    return this.afAuth.signInWithPopup(new auth.GithubAuthProvider)
      .then((user: auth.UserCredential) => this.authenticateUser(user))
      .catch(error => console.error(error));
  }

  public async logout() {
    await this.afAuth.signOut();
    this.authStatus.next(null);
    this.authenticatedUser = null;
    console.log("Logout successful");
    this.router.navigateByUrl("/authentication");
  }

  private authenticateUser(user: auth.UserCredential) {
    this.authStatus.next(user.user);
    this.authenticatedUser = user.user;
  }

  public getProfile(): Observable<any> {
    return this.afDatabase.object(`users/${this.authenticatedUser.uid}`).valueChanges();
  }

  public updateProfile(updatedProfile: UserProfile) {
    this.afDatabase.object(`users/${this.authenticatedUser.uid}`).update(updatedProfile).then(_ => console.log('Profile update successful'))
      .catch(err => console.log(err, 'Profile update failed'));
  }

  public uploadProfilePictureAndUpdateDatabaseEntry(file: File, activeProfile: UserProfile) {
    const pathReference = "users/" + this.authenticatedUser.uid;


    this.afStore.upload(pathReference, file).snapshotChanges()
      .subscribe(
        uploadSnapshot => {
          if (this.checkIfUploadFinished(uploadSnapshot)) {
            console.log("Profile picture upload successful");

            this.afStore.ref(pathReference).getDownloadURL().subscribe(
              downloadUrl => {
                 activeProfile.profilePictureUrl = downloadUrl;
                 this.updateProfile(activeProfile);
                }
            );
          }
        })
  }

  public updateProfilePictureUrl(profilePictureUrlObject) {
    this.afDatabase.object(`users/${this.authenticatedUser.uid}/profilePictureUrl`).update(profilePictureUrlObject)
    .then(_ => console.log('Profile picture url update successful'))
    .catch(err => console.log(err, 'Profile picture url update failed'));
  }

  private checkIfUploadFinished(uploadSnapshot: firebase.storage.UploadTaskSnapshot): boolean {
    return uploadSnapshot.bytesTransferred === uploadSnapshot.totalBytes;
  }

  // Unused as of right now
  public async checkIfEmailIsAvailable(email: string): Promise<boolean> {
    let emailIsAvailable = false;

    await this.afAuth.fetchSignInMethodsForEmail(email)
      .then((signInMethods) => {
        if (signInMethods.length === 0) {
          emailIsAvailable = true;
        }
      });

    return emailIsAvailable;
  }
}
