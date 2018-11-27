import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';

const HOST = 'http://localhost:3000';

@Injectable()
export class RestDataSource {
  constructor(private httpClient: HttpClient) {}
  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${HOST}/projects`);
  }

  getIssues(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(`${HOST}/issues`);
  }

  addIssue(issue: Issue) {
    return this.httpClient.post<Issue>(`${HOST}/issues`, issue);
  }

  updateIssue(updatedIssue: Issue) {
    return this.httpClient.patch<Issue>(
      `${HOST}/issues/${updatedIssue.id}`,
      updatedIssue
    );
  }

  deleteIssue(issueId) {
    return this.httpClient.delete(`${HOST}/issues/${issueId}`);
  }
}
