import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'src/app/service/message.service';
import { Router, NavigationExtras } from '@angular/router';

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
  }

  openChat(chatNumber: number) {
    const dataToPass = {
      matchId: this.userMatches[chatNumber],
      activeUserId: this.activeUserId
    };

    this.router.navigate([`tabs/matches/${this.userMatches[chatNumber]}`, dataToPass]);
  }

  private subscribeToUserMatches() {
    this.messageService.getMatchesForUserId(this.activeUserId).subscribe(
      matches => {
        this.userMatches = matches;
        console.log(this.userMatches);
      });
  }

}
