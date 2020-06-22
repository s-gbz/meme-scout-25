import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

describe('MessageService', () => {
  let httpTestingController: HttpTestingController;
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [MessageService],
       imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(MessageService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request and receive a new message', () => {
    
  });

  it('should send a new message', () => {
   
  });
});
