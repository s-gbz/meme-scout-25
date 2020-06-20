import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'messages.component.html',
  styleUrls: ['messages.component.scss']
})
export class Messages {
  constructor() {}

  messages = [
    {
      user: 'aleksej',
      createdAt: 1554090856000,
      msg: 'Beep beep test 123'
    },
    {
      user: 'katharzyna',
      createdAt: 1554090956000,
      msg: ':)'
    },
    {
      user: 'sergej',
      createdAt: 1554091056000,
      msg: 'Ich liebe Programmierschnittstellen!!!!! :DDD'
    }
  ];

  currentUser = 'aleksej';
  newMsg = '';
  @ViewChild(IonContent, {static:false}) content: IonContent

  sendMessage(){
    this.messages.push({
      user: 'aleksej',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });

    this.newMsg = '';
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }
}
