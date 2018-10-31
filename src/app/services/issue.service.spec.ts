import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { IssueService } from './issue.service';

describe('IssueService', () => {
  let injector: TestBed;
  let service: IssueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IssueService]
    });

    injector = getTestBed();
    service = injector.get(IssueService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getIssues', () => {
    it('should return all issues', () => {
      const dummyIssues = [
        {
          title: 'Broken modal',
          id: 1
        },
        {
          title: 'Wrong color',
          id: 2
        }
      ];

      service.getIssues().subscribe((issues: any) => {
        expect(issues.length).toBe(2);
        expect(issues).toEqual(dummyIssues);
      });

      const req = httpMock.expectOne('http://localhost:3000/issues');
      expect(req.request.method).toBe('GET');
      req.flush(dummyIssues);
    });
  });
});
