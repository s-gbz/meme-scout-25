import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../model/user';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { UrlConfig } from '../url.config';
import { UserCredentials } from '../model/user-credentials';


describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;

  const MOCK_USER: User = {};
  const MOCK_CREDENTIALS: UserCredentials = {
    email: "test@test.de",
    password: "Pa$$w0rd"
  }
  const EXAMPLE_ID_ON_REGISTER = 0;


  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [UserService],
       imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(UserService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get status code 200 on successful register', () => {
    let newId;

    service.register(MOCK_USER).subscribe(reponseId => {
      newId = reponseId;
    });

    httpTestingController.expectOne(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_REGISTER)
      .flush(EXAMPLE_ID_ON_REGISTER);

    expect(newId).toBe(EXAMPLE_ID_ON_REGISTER);
  });

  it('should get a valid profile on successful login', () => {
    let receivedUserProfile;

    service.login(MOCK_CREDENTIALS).subscribe(reponseUserProfile => {
      receivedUserProfile = reponseUserProfile;
    });

    httpTestingController.expectOne(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_LOGIN)
      .flush(MOCK_USER);

    expect(receivedUserProfile).toBe(MOCK_USER);
  });
});
