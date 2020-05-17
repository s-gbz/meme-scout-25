import { TestBed } from '@angular/core/testing';
import { MemeService } from './meme.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { UrlConfig } from '../url.config';
import { Meme } from '../model/meme';
import { MemePreference } from '../model/meme-preference';
import { MemeRating } from '../model/meme-rating';


describe('MemeService', () => {
  let httpTestingController: HttpTestingController;
  let service: MemeService;

  const MOCK_MEME: Meme = {
    id: 0,
    fileBlob: "",
    tags:  ["dogs", "lit", "pets"]
  };
  const MOCK_MEME_PREFERENCE: MemePreference = {
    likedTags: ["dogs", "lit", "pets"],
    uploadedTags: ["dogs", "lit", "pets"]
  };
  const MOCK_MEME_RATING: MemeRating = {
    id: MOCK_MEME.id,
    rating: true
  };

  
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [MemeService],
       imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(MemeService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request and receive new memes', () => {
    let newMemes;

    service.getMemes(MOCK_MEME_PREFERENCE).subscribe(reponseMemes => {
        newMemes = reponseMemes;
    });

    httpTestingController.expectOne(UrlConfig.BACKEND_BASE_URL + UrlConfig.MEMES)
      .flush(MOCK_MEME);

    expect(newMemes).toBe(MOCK_MEME);
  });

  it('should send a meme rating with a corresponding id', () => {
    service.rateMeme(MOCK_MEME_RATING).subscribe(reponseStatus => { });

    // TODO: Further research what rateMeme should return + how services should be tested properly
    httpTestingController.expectOne(UrlConfig.BACKEND_BASE_URL + UrlConfig.MEMES_RATE)
      .flush({});
  });

  it('should upload a meme', () => {
    service.uploadMeme(MOCK_MEME).subscribe(reponseStatus => { });

    // TODO: Further research what uploadMeme should return + how services should be tested properly
    httpTestingController.expectOne(UrlConfig.BACKEND_BASE_URL + UrlConfig.MEMES_UPLOAD)
      .flush({});
  });
});
