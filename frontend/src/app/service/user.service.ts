import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/model/user';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { UrlConfig } from '../url.config';
import { UserCredentials } from '../shared/model/user-credentials';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public isAuthenticated: boolean;
  public authToken: string;

  uid = this.afAuth.authState.pipe(
    map(authState => {
      if(!authState) {
        return null;
      } else {
        return authState.uid;
      }
    })
  )

  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private afs: AngularFirestore) { }
  
  public register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Unimplemented as of right now
  public async checkIfEmailIsAvailable(email: string): Promise<boolean>{
    let emailIsAvailable = false;

    await this.afAuth.fetchSignInMethodsForEmail(email)
    .then((signInMethods) => {
      if(signInMethods.length === 0) {
        emailIsAvailable = true;
      }
    });

    return emailIsAvailable;
  }

  public login(userCredentials: UserCredentials) {
    this.afAuth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password).then()
    
  }

  public loginWithGoogle() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider);
  }

  public loginWithGithub() {
    this.afAuth.signInWithPopup(new auth.GithubAuthProvider);
  }

  public async logout() {
    await this.afAuth.signOut();
  }

  public getProfile(userId: number): Observable<User> {
    return this.http.post<User>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_PROFILE, userId);
  }

  public updateProfile(updatedProfile: User): Observable<number> {
    return this.http.post<number>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_PROFILE_EDIT, updatedProfile);
  }
}
