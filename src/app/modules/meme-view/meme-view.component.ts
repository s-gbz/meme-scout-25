import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/service/meme.service';
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
  // Initial index
  activeMemeIndex = -1;
  memesLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // number of memes to view before requesting new memes
  memeRequestInterval = 1;

  constructor(private memeService: MemeService) { }

  ngOnInit() {
    this.memeService.getAllMemeReferences().subscribe(
      allReferences => {
        this.allMemeReferences = this.shuffleArray(allReferences);
        this.incrementActiveMemeIndexAndRequestNewMemes();
      }
    )
  }

  public rateMeme(like: boolean) {
    if (this.memesToViewAvailable()) {
      const memeId = this.allMemeReferences[this.activeMemeIndex];

      if (like) {
        this.memeService.likeMeme(memeId);
      } else {
        this.memeService.dislikeMeme(memeId);
      }

      this.incrementActiveMemeIndexAndRequestNewMemes();
    }
  }

  public superLikeMeme() {
    if (this.memesToViewAvailable()) {
      const memeId = this.allMemeReferences[this.activeMemeIndex];

      this.memeService.superLikeMeme(memeId);
      this.incrementActiveMemeIndexAndRequestNewMemes();
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
    return this.allMemeReferences && this.allMemeReferences.length != 0 && this.allMemeReferences.length > this.activeMemeIndex;
  }

  private incrementActiveMemeIndexAndRequestNewMemes() {
    this.activeMemeIndex++;

    if (this.activeMemeIndex % this.memeRequestInterval === 0) {
      if (this.allMemeReferences[this.activeMemeIndex] != undefined) {
        this.memeService.requestMemeWithoutStoragePrefix(this.allMemeReferences[this.activeMemeIndex]).subscribe(
          newMemeUrl => this.availableMemeUrls.push(newMemeUrl)
        );
      }
    }
  }
}
