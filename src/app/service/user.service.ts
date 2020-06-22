import { AlertMessage } from './../shared/alert-message/alert-message.component';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

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

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afStore: AngularFireStorage,
    private alertMessage: AlertMessage) { }


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
    this.alertMessage.presentAlert("Logout successful");
    this.router.navigateByUrl("/authentication");
  }

  public getProfile(): Observable<any> {
    return this.afDatabase.object(`users/${this.authenticatedUser.uid}`).valueChanges();
  }

  public getProfileById(userId: string): Observable<any> {
    return this.afDatabase.object(`users/${userId}`).valueChanges();
  }

  public updateProfile(updatedProfile: UserProfile) {
    this.afDatabase.object(`users/${this.authenticatedUser.uid}`).update(updatedProfile).then(_ => this.alertMessage.presentAlert("Update successful"))
      .catch(err => this.alertMessage.presentAlert("Update failed"));
  }

  public uploadProfilePictureAndUpdateDatabaseEntry(file: File, activeProfile: UserProfile) {
    const pathReference = "users/" + this.authenticatedUser.uid;

    this.afStore.upload(pathReference, file).snapshotChanges()
      .subscribe(
        uploadSnapshot => {
          if (this.checkIfUploadFinished(uploadSnapshot)) {
            this.alertMessage.presentAlert("Picture upload successful");

            this.afStore.ref(pathReference).getDownloadURL().subscribe(
              downloadUrl => {
                activeProfile.profilePictureUrl = downloadUrl;
                this.updateProfile(activeProfile);
              }
            );
          }
        });
  }

  public getAuthenticatedUser(): firebase.User {
    return this.authenticatedUser;
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

  private authenticateUser(user: auth.UserCredential) {
    this.authStatus.next(user.user);
    this.authenticatedUser = user.user;
  }

  private checkIfUploadFinished(uploadSnapshot: firebase.storage.UploadTaskSnapshot): boolean {
    return uploadSnapshot.bytesTransferred === uploadSnapshot.totalBytes;
  }
}
