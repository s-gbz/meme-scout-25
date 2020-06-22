import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';
import { UserMessage } from 'src/app/shared/model/user-message';
import { Observable } from 'rxjs';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'message-view',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss']
})
export class MessageComponent implements OnInit {

  activeUserId = null;
  activeUserProfile = null;

  matchId = null;

  matchPartnerId = null;
  matchPartnerProfile = null;

  messages: Observable<Array<UserMessage>> = null;
  matchIsValid = true;

  newMsg = '';
  @ViewChild(IonContent, {static:false}) content: IonContent;

  constructor(private route: ActivatedRoute, private messageService: MessageService, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(
      passedRouterData => {
        if (this.routerDataHasBeenPassed(passedRouterData)) {
          this.readPassedRouterData(passedRouterData);
          this.getMatchDetailsAndSetPartnerId();
          this.getActiveUserProfileDetailsById(this.activeUserId);
          this.requestMessages();
        } else {
          console.log("Error - no matchId or activeUserId has been passed");
        }
      });
  }

  sendMessage() {
    const newMessage: UserMessage = {
      timestamp: new Date().getTime(),
      recipient: this.matchPartnerId,
      sender: this.activeUserId,
      messageContent: this.newMsg
    }

    this.messageService.sendMessageToMatchId(newMessage, this.matchId);
    this.newMsg = '';
    
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }

  private requestMessages() {
    this.messages = this.messageService.getMessagesForMatchId(this.matchId);
  }

  private routerDataHasBeenPassed(passedRouterData) {
    return passedRouterData['matchId'] && passedRouterData['activeUserId'];
  }

  private readPassedRouterData(passedRouterData) {
    this.matchId = passedRouterData['matchId'];
    this.activeUserId = passedRouterData['activeUserId'];
  }

  private getMatchDetailsAndSetPartnerId() {
    this.messageService.getMatchDetailsByMatchId(this.matchId).subscribe(
      matchDetails => {
        this.setMatchPartnerId(matchDetails);
        this.getMatchPartnerProfileDetailsById(this.matchPartnerId);
      }
    )
  }

  private getActiveUserProfileDetailsById(profileId: string){
    this.userService.getProfileById(profileId).subscribe(
      profile => {
           this.activeUserProfile = profile;
     });
  }

  private getMatchPartnerProfileDetailsById(profileId: string){
    this.userService.getProfileById(profileId).subscribe(
      profile => {
           this.matchPartnerProfile = profile;
     });
  }

  private setMatchPartnerId(matchDetails) {
    if(matchDetails.user1 === this.activeUserId) {
      this.matchPartnerId = matchDetails.user2;
    } else{
      this.matchPartnerId = matchDetails.user1;
    }
  }

  userAndPartnerProfileLoaded(): boolean {
    return this.activeUserProfile && this.matchPartnerProfile;
  }
}
