import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemeService } from 'src/app/service/meme.service';

@Component({
  selector: 'app-my-saved-memes',
  templateUrl: './my-saved-memes.component.html',
  styleUrls: ['./my-saved-memes.component.scss'],
})
export class MySavedMemesComponent implements OnInit {

  mySavedMemes = [];

  constructor(private router: Router, private memeService: MemeService) { }

  ngOnInit() {
    this.showLikedMemes();
  }

  showLikedMemes() {
    this.memeService.getUserSuperLikedMemeReferences().subscribe(
      likedMemeReferences => {
        likedMemeReferences.forEach(memeReference => {
          console.log(memeReference);
          
          this.memeService.requestMemeWithoutStoragePrefix(memeReference).subscribe(
            downloadUrl => {
              console.log(downloadUrl);
              this.mySavedMemes.push(downloadUrl)
            }
          );
        });
      }
    )
  }
  
  backToProfileView() {
    this.router.navigateByUrl("/tabs/profile");
  }

  deleteMeme(index: number) {
    console.log(this.mySavedMemes);
    if (this.userUploadedMemeArrayIsNotEmpty(index)) {
      this.mySavedMemes.splice(index, 1);
      console.log(this.mySavedMemes);
    }
  }

  private userUploadedMemeArrayIsNotEmpty(index: number): boolean {
    return this.mySavedMemes != null && index > -1;
  }
}
