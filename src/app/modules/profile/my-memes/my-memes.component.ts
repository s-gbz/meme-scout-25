import { MemeService } from 'src/app/service/meme.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-memes',
  templateUrl: './my-memes.component.html',
  styleUrls: ['./my-memes.component.scss'],
})
export class MyMemesComponent implements OnInit {

  myMemes = [];

  constructor(private router: Router, private memeService: MemeService) { }

  ngOnInit() {

      this.memeService.getUserUploadedMemeReferences().subscribe(
        // Requested structure is a nested array = [ [], [] ]
        memeReferenceArrays => {
          const memeReferences = [];
  
          // Iterate top level to get all arrays
          for (let i = 0; i < memeReferenceArrays.length; i++) {
            const singleMemeReferenceArray = <Array<any>>memeReferenceArrays[i];
  
            // Iterate every array entry to get values
            for (let j = 0; j < singleMemeReferenceArray.length; j++) {
              memeReferences.push(singleMemeReferenceArray[j]);
            };
          }
  
          // Request every individual meme by reference
          const memeDownloadUrls = [];
          for (let i = 0; i < memeReferences.length; i++) {
            this.memeService.requestMeme(memeReferences[i]).subscribe(downloadUrl => {
              memeDownloadUrls.push(downloadUrl);
              this.myMemes.push(downloadUrl);
            });
          }
        });
  }

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

  backToProfileView() {
    this.router.navigateByUrl("/tabs/profile");
  }

  deleteMeme(index: number) {
    console.log(this.myMemes);
    if (this.userUploadedMemeArrayIsNotEmpty(index)) {
      this.myMemes.splice(index, 1);
      console.log(this.myMemes);
    }
  }

  private userUploadedMemeArrayIsNotEmpty(index: number): boolean {
    return this.myMemes != null && index > -1;
  }
}
