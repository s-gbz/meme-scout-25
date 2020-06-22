import { Injectable } from '@angular/core';

import { UserMessage } from '../shared/model/user-message';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    constructor(private afDatabase: AngularFireDatabase) { }

    public getMatchesForUserId(userId: string) : Observable<any> {
        return this.afDatabase.list(`users/${userId}/matches`).valueChanges();
    }

    public getMessagesForMatchId(matchId: string) : Observable<any> {
        return this.afDatabase.list(`messages/${matchId}`).valueChanges();
    }

    public sendMessageToMatchId(newMessage: UserMessage, matchId: string) {
        this.afDatabase.list(`messages/${matchId}`).push(newMessage)
            .then(_ => console.log('Send message successful'))
            .catch(err => console.log(err, 'Send message failed'));
    }

    public getMatchDetailsByMatchId(matchId: string) : Observable<any> {
        return this.afDatabase.object(`matches/${matchId}`).valueChanges();
    }
}