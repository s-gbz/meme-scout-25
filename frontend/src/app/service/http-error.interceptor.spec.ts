import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
    let http: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        const testBed = TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpErrorInterceptor,
                    multi: true
                }
            ]
        });

        http = testBed.get(HttpTestingController);
        httpClient = testBed.get(HttpClient);
    });

    // Avoiding interceptor test due to time constraint for now
});
