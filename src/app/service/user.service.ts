import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/model/user';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';

import { UrlConfig } from '../url.config';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  authStatus = new BehaviorSubject<firebase.User>(null);
  authenticatedUser: firebase.User;

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }


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

  // TODO: Switch to Firebase
  public getProfile(userId: number): Observable<User> {
    return this.http.post<User>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_PROFILE, userId);
  }

  // TODO: Switch to Firebase
  public updateProfile(updatedProfile: User): Observable<number> {
    return this.http.post<number>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_PROFILE_EDIT, updatedProfile);
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
