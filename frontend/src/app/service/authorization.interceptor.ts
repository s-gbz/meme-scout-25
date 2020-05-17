import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(private userService: UserService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.userService.isAuthenticated) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.userService.authToken) });
        }
        else {
            if(environment.interceptAuthentication) {
                this.router.navigate(['LoginPage']);
            }
        }
        return next.handle(request);
    }
}