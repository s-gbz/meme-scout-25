import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../url.config';
import { UserMessage } from '../model/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MessageService{

    constructor(private http: HttpClient) { }
    
    public getMessages(): Observable<UserMessage[]> {
        // Include a POST mandatory request body - authorization is handled in separate interceptor
        return this.http.post<UserMessage[]>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_GET_MESSAGES, {});
    }

    public writeMessage(newMessage: UserMessage): Observable<number> {
        return this.http.post<number>(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_WRITE_MESSAGE, newMessage);
    }
}