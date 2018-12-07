import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Project } from '../models/project.model';
import { Issue } from '../models/issue.model';

/**
 * A datasource for static data. For demonstration purposes,
 * this can be deployed to an Openshift cluster since it has no dependency on JSON server.
 */
@Injectable()
export class StaticDataSource {
  private projects: Project[] = [
    {
      title: 'Accessorials',
      team: 'Pricing'
    },
    {
      title: 'Trailer Prioritization',
      team: 'Linehaul'
    },
    {
      title: 'Walkplan',
      team: 'Linehaul'
    },
    {
      title: 'Driver Availability',
      team: 'Linehaul'
    }
  ];

  private issues: Issue[] = [
    new Issue(
      'Modal not opening',
      'Brian',
      'P0',
      'Accepted',
      'Model not opening when button clicked',
      '01/25/2018',
      '01/25/2018',
      'Walk Plan',
      '0'
    ),
    new Issue(
      'Form not submitting',
      'Daniel',
      'P0',
      'Assigned',
      'Form does not submit on click',
      '01/25/2018',
      '01/25/2018',
      'Trailer Prioritization',
      '1'
    ),
    new Issue(
      'Hover color',
      'John',
      'P0',
      'Assigned',
      'Hover color needs to be changed',
      '01/25/2018',
      '01/25/2018',
      'Accessorials',
      '2'
    )
  ];

  getProjects(): Observable<Project[]> {
    return from([this.projects]);
  }

  getIssues(): Observable<Issue[]> {
    return from([this.issues]);
  }

  addIssue(issue: Issue): Observable<Issue> {
    this.issues.push(issue);
    console.log(this.issues);
    return from([issue]);
  }

  updateIssue(updatedIssue: Issue): Observable<Issue[]> {
    const index = this.issues.findIndex(issue => issue.id === updatedIssue.id);
    console.log('index', index);
    this.issues[index] = updatedIssue;
    console.log(this.issues);
    return from([this.issues]);
  }

  deleteIssue(issueId): Observable<Issue[]> {
    this.issues = this.issues.filter(issue => {
      return issue.id !== issueId;
    });
    return from([this.issues]);
  }
}
