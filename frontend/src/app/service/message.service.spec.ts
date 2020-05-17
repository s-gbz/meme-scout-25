import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { UrlConfig } from '../url.config';
import { UserMessage } from '../model/message';


describe('MessageService', () => {
  let httpTestingController: HttpTestingController;
  let service: MessageService;

  const MOCK_MESSAGE: UserMessage = {
      id: new Date().getTime(),
      receiver: 0,
      sender: 1,
      text: "Hi!"
  };


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
    let newMessage;

    service.getMessages().subscribe(responseMessage => {
        newMessage = responseMessage;
    });

    httpTestingController.expectOne(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_GET_MESSAGES)
      .flush(MOCK_MESSAGE);

    expect(newMessage).toBe(MOCK_MESSAGE);
  });

  it('should send a new message', () => {
    service.writeMessage(MOCK_MESSAGE).subscribe(responseStatus => {

    });

    // TODO: Further research what writeMessage should return + how services should be tested properly
    httpTestingController.expectOne(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_WRITE_MESSAGE).flush({});
  });
});
