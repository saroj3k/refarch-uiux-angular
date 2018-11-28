import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';

const HOST = 'http://localhost:3000';

@Injectable()
export class RestDataSource {
  constructor(private httpClient: HttpClient) {}

  /**
   * Returns an Observable array of Projects.
   */
  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${HOST}/projects`);
  }

  /**
   * Returns an Observable array of Issues.
   */
  getIssues(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(`${HOST}/issues`);
  }

  /**
   * Returns an Observable to add an Issue.
   *
   * @param issue The Issue to add
   */
  addIssue(issue: Issue) {
    return this.httpClient.post<Issue>(`${HOST}/issues`, issue);
  }

  /**
   * Returns an Observable to update an Issue.
   *
   * @param updatedIssue The Issue to update
   */
  updateIssue(updatedIssue: Issue) {
    return this.httpClient.patch<Issue>(
      `${HOST}/issues/${updatedIssue.id}`,
      updatedIssue
    );
  }

  /**
   * Returns an Observable to delete an Issue.
   *
   * @param issueId The ID of the Issue to delete
   */
  deleteIssue(issueId) {
    return this.httpClient.delete(`${HOST}/issues/${issueId}`);
  }
}
