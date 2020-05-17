import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UrlConfig } from '../url.config';
import { HttpClient } from '@angular/common/http';
import { Meme } from '../model/meme';
import { MemePreference } from '../model/meme-preference';
import { MemeRating } from '../model/meme-rating';

@Injectable({
    providedIn: 'root'
})

export class MemeService{

    constructor(private http: HttpClient) { }
    
    public getMemes(memePrefrence: MemePreference): Observable<Meme[]> {
        return this.http.post<Meme[]>(UrlConfig.BACKEND_BASE_URL + UrlConfig.MEMES, memePrefrence);
    }

    public rateMeme(memeRating: MemeRating): Observable<number> {
        return this.http.post<number>(UrlConfig.BACKEND_BASE_URL + UrlConfig.MEMES_RATE, memeRating);
    }

    public uploadMeme(meme: Meme): Observable<number> {
        return this.http.post<number>(UrlConfig.BACKEND_BASE_URL + UrlConfig.MEMES_UPLOAD, meme);
    }
}