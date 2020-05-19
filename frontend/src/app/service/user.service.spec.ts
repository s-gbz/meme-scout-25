import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../shared/model/user';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { UrlConfig } from '../url.config';
import { UserCredentials } from '../shared/model/user-credentials';


describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;

  const EXAMPLE_ID = 0;
  const MOCK_USER: User = {
    id: EXAMPLE_ID
  };
  const MOCK_CREDENTIALS: UserCredentials = {
    email: "test@test.de",
    password: "Pa$$w0rd"
  }


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
      .flush(EXAMPLE_ID);

    expect(newId).toBe(EXAMPLE_ID);
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

  it('should send an ID and receive a corresponding profile', () => {
    let receivedUserProfile;

    service.getProfile(EXAMPLE_ID).subscribe(reponseUserProfile => {
      receivedUserProfile = reponseUserProfile;
    });

    httpTestingController.expectOne(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_PROFILE)
      .flush(MOCK_USER);

    expect(receivedUserProfile).toBe(MOCK_USER);
  });

  it('should send an updated user profile', () => {
    service.updateProfile(MOCK_USER).subscribe(responseStatus => {

    });

    // TODO: Further research what updateProfile should return + how services should be tested properly
    httpTestingController.expectOne(UrlConfig.BACKEND_BASE_URL + UrlConfig.USER_PROFILE_EDIT).flush({});
  });
});
