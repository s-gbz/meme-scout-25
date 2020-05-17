import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/model/user';
import { Observable } from 'rxjs';

import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient,) { }
  
  public register(newUser: User): Observable<number> {
    return this.http.post<number>(AppSettings.BACKEND_BASE_URL + AppSettings.USER_REGISTER, newUser);
  }

  

}
