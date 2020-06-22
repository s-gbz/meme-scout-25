import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'message-view',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() activeUserId: string;
  @Input() matchId: string;

  constructor() { }

  ngOnInit() {
    console.log(this.activeUserId);
    console.log(this.matchId);
    
  }

  // currentUser = 'aleksej';
  // newMsg = '';
  // @ViewChild(IonContent, { static: false }) content: IonContent

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
