import { Injectable } from '@angular/core';
import { Issue } from '../models/issue.model';
import { RestDataSource } from '../datasource/rest.datasource';
import { Subject } from 'rxjs';
// import { StaticDataSource } from '../datasource/static.datasource';

@Injectable()
export class IssueService {
  constructor(private dataSource: RestDataSource) {}

  issue: Issue;

  // Observable source
  private issueAddedSource = new Subject<any>();

  // Observable stream
  issueAdded$ = this.issueAddedSource.asObservable();

  getIssues(): Promise<Issue[]> {
    return new Promise<Issue[]>(resolve => {
      this.dataSource.getIssues().subscribe(issues => {
        resolve(issues);
      });
    });
  }

  addIssue(issue: Issue): Promise<Issue> {
    return new Promise<Issue>(resolve => {
      this.dataSource.addIssue(issue).subscribe(data => {
        resolve(data);
      });
    });
  }

  confirmIssueAdded() {
    this.issueAddedSource.next();
  }

  updateIssue(issue: Issue) {
    return new Promise(resolve => {
      this.dataSource.updateIssue(issue).subscribe(() => {
        resolve();
      });
    });
  }

  deleteIssue(issueId) {
    return new Promise(resolve => {
      this.dataSource.deleteIssue(issueId).subscribe(() => {
        resolve();
      });
    });
  }
}
