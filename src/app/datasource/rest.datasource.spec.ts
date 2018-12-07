import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Issue } from '../models/issue.model';
import { RestDataSource } from './rest.datasource';
import { StaticDataSource } from './static.datasource';

describe('RestDataSource', () => {
  let injector: TestBed;
  let dataSource: RestDataSource;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestDataSource, StaticDataSource]
    });

    injector = getTestBed();
    dataSource = injector.get(RestDataSource);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(dataSource).toBeTruthy();
  });

  describe('#getProjects', () => {
    it('should return all projects', () => {
      const dummyProjects = [
        {
          title: 'Accessorials',
          team: 'Pricing'
        },
        {
          title: 'Trailer Prioritization',
          team: 'Linehaul'
        }
      ];

      dataSource.getProjects().subscribe((projects: any) => {
        expect(projects.length).toBe(2);
        expect(projects).toEqual(dummyProjects);
      });

      const req = httpMock.expectOne('http://localhost:3000/projects');
      expect(req.request.method).toBe('GET');
      req.flush(dummyProjects);
    });
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

      dataSource.getIssues().subscribe((issues: any) => {
        expect(issues.length).toBe(2);
        expect(issues).toEqual(dummyIssues);
      });

      // The url has to be the same as the url in the issueService.
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
      const newIssue = new Issue();
      newIssue.assignee = '<unassigned>';
      newIssue.title = 'New issue';

      dataSource.addIssue(newIssue).subscribe(issue => {
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
      const updatedIssue = new Issue();
      updatedIssue.assignee = 'User';
      updatedIssue.title = 'Updated issue';
      updatedIssue.id = '1';

      dataSource.updateIssue(updatedIssue).subscribe(issue => {
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
      dataSource.deleteIssue(1).subscribe(data => {
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
