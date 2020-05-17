import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

import { UrlConfig } from '../url.config';
import { UserCredentials } from '../model/user-credentials';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public isAuthenticated: boolean;
  public authToken: string;

  constructor(private http: HttpClient) { }
  
  public register(newUser: User): Observable<number> {
    return this.http.post<number>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_REGISTER, newUser);
  }

  public login(userCredentials: UserCredentials): Observable<User> {
    return this.http.post<User>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_LOGIN, userCredentials);
  }

  public getProfile(userId: number): Observable<User> {
    return this.http.post<User>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_PROFILE, userId);
  }

  public updateProfile(updatedProfile: User): Observable<number> {
    return this.http.post<number>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_PROFILE_EDIT, updatedProfile);
  }
}
