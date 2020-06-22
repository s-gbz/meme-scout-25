import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'chat',
  templateUrl: 'messages.component.html',
  styleUrls: ['messages.component.scss']
})
export class Messages {


  constructor() { }

  currentUser = 'aleksej';
  newMsg = '';
  @ViewChild(IonContent, { static: false }) content: IonContent

  sendMessage() {
    // this.messages.push({
    //   user: 'aleksej',
    //   createdAt: new Date().getTime(),
    //   msg: this.newMsg
    // });

    // this.newMsg = '';
    // setTimeout(() => {
    //   this.content.scrollToBottom(200);
    // });
  }
}
