import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../shared/model/user';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { AppSettings } from '../app.settings';


describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;

  const mockUser: User = {};
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

    service.register(mockUser).subscribe(reponseId => {
      newId = reponseId;
    });

    httpTestingController.expectOne(AppSettings.BACKEND_BASE_URL + AppSettings.USER_REGISTER)
      .flush(EXAMPLE_ID_ON_REGISTER);

    expect(newId).toBe(EXAMPLE_ID_ON_REGISTER);
  });

});
