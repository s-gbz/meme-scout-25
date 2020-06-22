import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-memes',
  templateUrl: './my-memes.component.html',
  styleUrls: ['./my-memes.component.scss'],
})
export class MyMemesComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      passedRouterData => {
        console.log(passedRouterData);
      });
  }

}
