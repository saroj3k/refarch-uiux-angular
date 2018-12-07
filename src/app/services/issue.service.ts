import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Issue } from '../models/issue.model';
import { RestDataSource } from '../datasource/rest.datasource';
// import { StaticDataSource } from '../datasource/static.datasource';

/**
 * The service methods return a Promise. Since subcribing to Observables is Asyncronous,
 * this was done to ensure the service waits until it retrieves everything from the datasource
 * before resolving (successfully returning) the data.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
 */
@Injectable()
export class IssueService {
  constructor(private dataSource: RestDataSource) {}
  // constructor(private dataSource: StaticDataSource) {}

  issue: Issue;

  // Observable source
  private issueAddedSource = new Subject<any>();

  // Observable stream
  issueAdded$ = this.issueAddedSource.asObservable();

  /**
   * Called when an issue is successfully added to alert subscribers.
   * The Search component is a subscriber. When the Add-Issue-Dialog component
   * calls this method the Search component is alerted. This is one method of communicating
   * between components. More can be found here:
   * https://angular.io/guide/component-interaction#component-interaction
   */
  confirmIssueAdded() {
    this.issueAddedSource.next();
  }

  /**
   * Retrieves all issues from the REST datasource.
   */
  getIssues(): Promise<Issue[]> {
    return new Promise<Issue[]>(resolve => {
      this.dataSource.getIssues().subscribe(issues => {
        resolve(issues);
      });
    });
  }

  /**
   * Posts a new Issue to the REST datasource.
   *
   * @param issue The new issue to be added
   */
  addIssue(issue: Issue): Promise<Issue> {
    return new Promise<Issue>(resolve => {
      this.dataSource.addIssue(issue).subscribe(data => {
        resolve(data);
      });
    });
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
