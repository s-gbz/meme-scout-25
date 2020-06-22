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

  // *ngIf="allMemeReferences && allMemeReferences.length != 0" 
  allMemeReferences: [];
  availableMemeUrls = [];
  activeMemeIndex: number;
  memesLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private memeService: MemeService) { }

  ngOnInit() {
    this.memeService.getAllMemeReferences().subscribe(
      allReferences => {
        this.allMemeReferences = this.shuffleArray(allReferences);
                        
        this.requestNewMemesAfterNumberOfViewed(5);
      }
    )
  }

  private requestNewMemesAfterNumberOfViewed(requestIntervall: number) {


    this.memeService.requestMeme("memeReference").subscribe(
      downloadUrl => this.availableMemeUrls.push(downloadUrl)
    );
  }

  public rateMeme(like: boolean) {
    if (this.memesToViewAvailable()) {
      const memeId = this.allMemeReferences[this.activeMemeIndex];

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
      const memeId = this.allMemeReferences[this.activeMemeIndex];

      this.memeService.superLikeMeme(memeId);
      this.removeFirstMemeAndSetNewActiveMeme();
    }
  }

  private shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

  public memesToViewAvailable(): boolean {
    return this.availableMemeUrls.length > 0;
  }

  private removeFirstMemeAndSetNewActiveMeme() {
    this.availableMemeUrls.shift();

  }

  // To be removed
  // private requestNewMemes() {
  //   this.memeService.getMemes().then(
  //     (newMemes) =>
  //      {         
  //        this.availableMemes = newMemes;
  //        this.activeMemeIndex = 0;
  //        this.memesLoaded.next(true);
  //      }
  //   );
  // }
}
