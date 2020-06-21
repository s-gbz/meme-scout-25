import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/service/meme.service';
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

  public rateMeme(like: boolean) {
    if (this.memesToViewAvailable()) {
      const memeId = this.availableMemes[this.activeMemeIndex].id;

      if(like) {
        this.memeService.likeMeme(memeId);
      } else {
        this.memeService.dislikeMeme(memeId);
      }

      this.removeFirstMemeAndSetNewActiveMeme();
    }
  }

  // 100% functional
  showLikedMemes() {
    this.memeService.getUserLikedMemeReferences().subscribe(
      likedMemeReferences => {
        console.log(likedMemeReferences);
        likedMemeReferences.forEach(memeReference => {
          this.memeService.requestMeme(memeReference).subscribe(
            downloadUrl => console.log(downloadUrl)
          );
        });
      }
    )
  }

  public superLikeMeme() {
    if (this.memesToViewAvailable()) {
      const memeId = this.availableMemes[this.activeMemeIndex].id;

      this.memeService.superLikeMeme(memeId);
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
