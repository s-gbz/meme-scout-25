import { TestBed } from '@angular/core/testing';
import { MemeService } from './meme.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { UrlConfig } from '../url.config';
import { Meme } from '../shared/model/meme';
import { MemePreference } from '../shared/model/meme-preference';
import { MemeRating } from '../shared/model/meme-rating';


describe('MemeService', () => {
  let httpTestingController: HttpTestingController;
  let service: MemeService;

  const MOCK_MEME = {
    id: 0,
    fileBlob: "",
    tags:  ["dogs", "lit", "pets"]
  };
  const MOCK_MEME_PREFERENCE: MemePreference = {
    likedTags: ["dogs", "lit", "pets"],
    uploadedTags: ["dogs", "lit", "pets"]
  };
  const MOCK_MEME_RATING = {
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

  });

  it('should send a meme rating with a corresponding id', () => {

  });

  it('should upload a meme', () => {

  });
});
