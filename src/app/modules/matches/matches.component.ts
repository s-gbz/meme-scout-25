import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class Matches implements OnInit {

  activeUserId = null;
  userMatches = [];

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.activeUserId = this.userService.getAuthenticatedUser().uid;
    this.subscribeToUserMatches();

    // If matches

    // List available matches
    // On click -> open message-view. pass data
  }

  private subscribeToUserMatches() {
    this.messageService.getMatchesForUserId(this.activeUserId).subscribe(
      matches => {
        this.userMatches = matches;
        console.log(this.userMatches);
      });
  }

}
