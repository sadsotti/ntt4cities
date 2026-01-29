import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { environment } from '../../../environments/environment';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers should make a GET request', () => {
    service.getUsers(1, 10).subscribe();
    const req = httpMock.expectOne(r => r.url.includes('/users'));
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deleteUser should send a DELETE request', () => {
    service.deleteUser(1).subscribe();
    const req = httpMock.expectOne(req => req.method === 'DELETE');
    expect(req.request.url).toContain('/users/1');
    req.flush(null);
  });
});