import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';

@Injectable()
export class RestDataSource {
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:3000/projects');
  }

  getIssues(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>('http://localhost:3000/issues');
  }

  addIssue(issue: Issue) {
    return this.httpClient.post<Issue>('http://localhost:3000/issues', issue);
  }

  updateIssue(updatedIssue: Issue) {
    return this.httpClient.patch<Issue>(
      'http://localhost:3000/issues/' + updatedIssue.id,
      updatedIssue
    );
  }

  deleteIssue(issueId) {
    return this.httpClient.delete('http://localhost:3000/issues/' + issueId);
  }
}
