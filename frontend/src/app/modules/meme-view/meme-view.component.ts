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

  availableMemes: Meme[] = [];
  private activeMemeIndex: number;

  constructor(private memeService: MemeService) { }

  ngOnInit() {
    this.requestNewMemes();
  }

  public likeMeme(like: boolean) {
    if (this.memesToViewAvailable()) {
      const memeRating: MemeRating = {
        memeId: this.availableMemes[this.activeMemeIndex].id,
        rating: like
      }

      // this.memeService.rateMeme(meme_rating);
      this.removeLastMemeAndSetNewActiveMeme();
    }
  }

  public superLikeMeme() {
    if (this.memesToViewAvailable()) {
      const memeRating: MemeRating = {
        memeId: this.availableMemes[this.activeMemeIndex].id,
        rating: true,
        superLike: true
      }

      // this.memeService.rateMeme(meme_rating);
      this.removeLastMemeAndSetNewActiveMeme();
    }
  }

  public memesToViewAvailable(): boolean {
    return this.activeMemeIndex >= 0;
  }

  private removeLastMemeAndSetNewActiveMeme() {
    console.log(this.activeMemeIndex);
    this.activeMemeIndex--;

    this.availableMemes.pop();
  }

  private requestNewMemes() {
    Promise.resolve(this.memeService.getMemes()).then(
      (newMemes) =>
       { 
         this.availableMemes = newMemes;
         this.activeMemeIndex = this.availableMemes.length - 1;
         console.log(this.availableMemes);
         console.log("index: " + this.activeMemeIndex);
         
       }
    );
  }
}
