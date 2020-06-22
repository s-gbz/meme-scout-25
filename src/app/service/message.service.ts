import { Injectable } from '@angular/core';

import { UserMessage } from '../shared/model/message';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    constructor(private afDatabase: AngularFireDatabase) { }

    public getMessagesForMatchId(matchId: string) {
        return this.afDatabase.list(`messages/${matchId}`).valueChanges();
    }

    public sendMessageToMatchId(newMessage: UserMessage, matchId: string) {
        this.afDatabase.list(`messages/${matchId}`).push(newMessage)
            .then(_ => console.log('Send message successful'))
            .catch(err => console.log(err, 'Send message failed'));
    }
}