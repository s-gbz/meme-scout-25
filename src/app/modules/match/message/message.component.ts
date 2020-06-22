import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'message-view',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.readPassedRouterData();
  }

  sendMessage() {

  }

  private readPassedRouterData() {
    this.route.params.subscribe(
      passedRouterData => {
        if (passedRouterData['matchId'] && passedRouterData['activeUserId']) {
          console.log(passedRouterData['matchId']);
          console.log(passedRouterData['activeUserId']);
        }
      });
  }
}
