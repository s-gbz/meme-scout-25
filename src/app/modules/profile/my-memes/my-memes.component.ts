import { MemeService } from 'src/app/service/meme.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-memes',
  templateUrl: './my-memes.component.html',
  styleUrls: ['./my-memes.component.scss'],
})
export class MyMemesComponent implements OnInit {

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  memes = [];

  constructor(private route: ActivatedRoute, private memeService: MemeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      passedRouterData => {
        console.log(passedRouterData);
      });

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
              this.memes.push(downloadUrl);
            });
          }
        });
  }
}
