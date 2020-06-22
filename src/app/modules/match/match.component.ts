import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'match-view',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {

  activeUserId = null;
  userMatches = [];

  constructor(private router: Router, private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.activeUserId = this.userService.getAuthenticatedUser().uid;
    this.subscribeToUserMatches();

    // If matches

    // List available matches
    // On click -> open message-view. pass data
  }

  openChat(chatNumber: number) {
    console.log("openChat " + chatNumber);
    this.router.navigate(["tabs/matches", this.userMatches[chatNumber]]);
  }

  private subscribeToUserMatches() {
    this.messageService.getMatchesForUserId(this.activeUserId).subscribe(
      matches => {
        this.userMatches = matches;
        console.log(this.userMatches);
      });
  }

}
