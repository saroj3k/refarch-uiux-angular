import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { IssueService } from './issue.service';
import { RestDataSource } from '../datasource/rest.datasource';

describe('IssueService', () => {
  let injector: TestBed;
  let issueService: IssueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IssueService, RestDataSource]
    });

    injector = getTestBed();
    issueService = injector.get(IssueService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(issueService).toBeTruthy();
  });
});
