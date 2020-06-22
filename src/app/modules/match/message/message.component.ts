import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'message-view',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss']
})
export class MessageComponent implements OnInit {

  activeUserId = null;
  matchId = null;
  messages = [];

  constructor(private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe(
      passedRouterData => {
        if (this.routerDataHasBeenPassed(passedRouterData)) {
          this.readPassedRouterData(passedRouterData);
          this.requestMessages();
        } else {
          console.log("Error - no matchId or activeUserId has been passed");
        }
      });
  }

  sendMessage() {

  }

  private requestMessages() {
    this.messageService.getMessagesForMatchId(this.matchId).subscribe(
      messages => {
        console.log(messages);
      }
    )
  }

  private routerDataHasBeenPassed(passedRouterData) {
    return passedRouterData['matchId'] && passedRouterData['activeUserId'];
  }

  private readPassedRouterData(passedRouterData) {
    this.matchId = passedRouterData['matchId'];
    this.activeUserId = passedRouterData['activeUserId'];
  }

  private checkIfMatchIdExists(matchId: string) {

  }
}
