import { Injectable } from '@angular/core';
import { Issue } from '../models/issue.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  issue: Issue;
  issues: Observable<any>;
  constructor(public http: HttpClient) {}

  // Observable source
  private issueAddedSource = new Subject<any>();

  // Observable stream
  issueAdded$ = this.issueAddedSource.asObservable();

  addIssue(issue: Issue) {
    return this.http.post<Issue>('http://localhost:3000/issues', issue);
  }

  confirmIssueAdded() {
    this.issueAddedSource.next();
  }

  getIssues() {
    return this.http.get<Issue[]>('http://localhost:3000/issues');
  }

  updateIssue(updatedIssue: Issue) {
    return this.http.patch<Issue>(
      'http://localhost:3000/issues/' + updatedIssue.id,
      updatedIssue
    );
  }

  deleteIssue(issueId) {
    return this.http.delete('http://localhost:3000/issues/' + issueId);
  }
}
