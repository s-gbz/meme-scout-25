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

@Injectable({
  providedIn: 'root'
})

export class UserService {

  authStatus = new BehaviorSubject<firebase.User>(null);
  authenticatedUser: firebase.User;
  private storageRef = this.afStore.storage;


  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private afStore: AngularFireStorage) { }


  public register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user: auth.UserCredential) => this.authenticateUser(user))
      .catch(error => this.handleError(error));
  }

  public login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user: auth.UserCredential) => this.authenticateUser(user))
      .catch(error => this.handleError(error));
  }

  public loginWithGoogle(): Promise<any> {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider)
      .then((user: auth.UserCredential) => this.authenticateUser(user))
      .catch(error => this.handleError(error));
  }

  public loginWithGithub(): Promise<any> {
    return this.afAuth.signInWithPopup(new auth.GithubAuthProvider)
    .then((user: auth.UserCredential) => this.authenticateUser(user))
    .catch(error => this.handleError(error));
  }

  public async logout() {
    await this.afAuth.signOut();
    this.authStatus.next(null);
    this.authenticatedUser = null;
  }

  private authenticateUser(user: auth.UserCredential) {
    this.authStatus.next(user.user);
    this.authenticatedUser = user.user;
  }

  // // TODO: Switch to Firebase
  // public getProfile(userId: number): Observable<User> {
  //   return this.http.post<User>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_PROFILE, userId);
  // }

  public getProfile(): Observable<any> {    
    return this.afDatabase.object(`users/${this.authenticatedUser.uid}`).valueChanges();
  }

  public updateProfile(updatedProfile: UserProfile) {
    this.afDatabase.object(`users/${this.authenticatedUser.uid}`).update(updatedProfile).then(_ => console.log('Profile update successful'))
    .catch(err => console.log(err, 'Profile update failed'));
  }

  public uploadProfilePicture(newProfilePicture: File): Observable<any> {
    const fileRef = `users/${this.authenticatedUser.uid}`;
    console.log(newProfilePicture);
    
    const profileUploadTask = this.afStore.upload(fileRef, newProfilePicture)
    
    profileUploadTask.then(_ => {
      console.log('Profile picture upload successful');

    })
    .catch(err => console.log(err, 'Profile picture upload failed'));

    return profileUploadTask.snapshotChanges().pipe(
      finalize(() => this.afStore.ref(fileRef).getDownloadURL())
   );
  }

  public uploadSingleProfilePicture(file: File) {
    const path = "users/" + this.authenticatedUser.uid;


    const profileUploadTask = this.afStore.upload(path, file)
    // .then(_ => {
    //   console.log('Profile picture upload successful');

    // })
    // .catch(err => console.log(err, 'Profile picture upload failed'));;
    return profileUploadTask.snapshotChanges().pipe(
      finalize(() => {
        console.log('Profile picture upload successful');
        this.afStore.ref(path).getDownloadURL()})
   ).subscribe();
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

  private handleError(error) {
    console.error(error);
  }
}
