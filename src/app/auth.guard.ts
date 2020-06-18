import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(): Observable<boolean> {    

      return this.userService.authStatus.pipe(
           take(1),
           map(user => !!user), // <-- map to boolean
           tap(loggedIn => {             
             if (!loggedIn) {
               this.router.navigateByUrl("/authentication");
             }
         })
    )
  }
}
