import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'authentication-page',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  authenticationComponent: "register" | "login" = 'login';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscribeAndSwitchToRequestedAuthenticationComponent();
  }

  // ActivatedRoute is handled by Angular and doesn't need unsubscribing
  subscribeAndSwitchToRequestedAuthenticationComponent() {
    this.route.queryParams.subscribe((authComponent: Params) => {
      this.authenticationComponent = authComponent['component'];
      console.log(this.authenticationComponent);
    });
  }
}
