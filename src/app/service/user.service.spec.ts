import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';



describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;

  const EXAMPLE_ID = 0;
  const MOCK_USER = {
    id: EXAMPLE_ID
  };
  const MOCK_CREDENTIALS = {
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

  });

  it('should get a valid profile on successful login', () => {

  });

  it('should send an ID and receive a corresponding profile', () => {

  });

  it('should send an updated user profile', () => {
    
  });
});
