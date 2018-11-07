import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { IssueService } from './issue.service';
import { Issue } from '../models/issue.model';

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

  describe('getIssues()', () => {
    it('should return the data', () => {
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

      // The url has to be the same as the url in the service.
      const req = httpMock.expectOne(
        'http://localhost:3000/issues',
        'call to api'
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyIssues);
    });
  });

  describe('addIssue()', () => {
    it('should post the correct data', () => {
      let newIssue = new Issue();
      newIssue.assignee = '<unassigned>';
      newIssue.title = 'New issue';

      service.addIssue(newIssue).subscribe(issue => {
        expect(issue).toEqual(newIssue);
      });

      const req = httpMock.expectOne(
        'http://localhost:3000/issues',
        'post to api'
      );
      expect(req.request.method).toBe('POST');
      req.flush(newIssue);
    });
  });

  describe('updateIssue()', () => {
    it('should patch the correct data', () => {
      let updatedIssue = new Issue();
      updatedIssue.assignee = 'User';
      updatedIssue.title = 'Updated issue';
      updatedIssue.id = 1;

      service.updateIssue(updatedIssue).subscribe(issue => {
        expect(issue).toEqual(updatedIssue);
      });

      const req = httpMock.expectOne(
        'http://localhost:3000/issues/1',
        'patch to api'
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(updatedIssue);
    });
  });

  describe('deleteIssue()', () => {
    it('should delete the correct data', () => {
      service.deleteIssue(1).subscribe(data => {
        expect(data).toBe(1);
      });

      const req = httpMock.expectOne(
        'http://localhost:3000/issues/1',
        'delete to api'
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(1);
    });
  });
});
