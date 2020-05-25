import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/service/meme.service';
import { MemeRating } from 'src/app/shared/model/meme-rating';
import { Meme } from 'src/app/shared/model/meme';

@Component({
  selector: 'app-meme-view',
  templateUrl: 'meme-view.component.html',
  styleUrls: ['meme-view.component.scss']
})
export class MemeView implements OnInit {

  memes: Meme[];

  constructor(private memeService: MemeService) { }
    
  ngOnInit() {
    this.requestNewMemes();
  }

  likeMeme() {
    alert("Liked/Disliked meme");

    // this.memeService.rateMeme(meme_rating);
  }

  private requestNewMemes() {
    Promise.resolve(this.memeService.getMemes()).then(
      (newMemes) =>
        this.memes = newMemes
    );
  }
}
