import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/service/meme.service';
import { MemeRating } from 'src/app/shared/model/meme-rating';
import { Meme } from 'src/app/shared/model/meme';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-meme-view',
  templateUrl: 'meme-view.component.html',
  styleUrls: ['meme-view.component.scss']
})
export class MemeView implements OnInit {

  availableMemes: Meme[];
  activeMemeIndex: number;
  memesLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
      this.removeFirstMemeAndSetNewActiveMeme();
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
      this.removeFirstMemeAndSetNewActiveMeme();
    }
  }

  public memesToViewAvailable(): boolean {
    return this.availableMemes.length > 0;
  }

  private removeFirstMemeAndSetNewActiveMeme() {
    this.availableMemes.shift();
  }

  private requestNewMemes() {
    this.memeService.getMemes().then(
      (newMemes) =>
       {         
         this.availableMemes = newMemes;
         this.activeMemeIndex = 0;
         this.memesLoaded.next(true);
       }
    );
  }
}
