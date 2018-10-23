import { Injectable } from '@angular/core';
import { Issue } from '../models/issue.model';
import { AddIssueDialogComponent } from '../components/add-issue-dialog/add-issue-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  issue: Issue;
  issues: Observable<any>;
  constructor(public http: HttpClient) { }

  addIssue(issue: Issue){
    return this.http.post<Issue>('http://localhost:3000/issues', issue);
  }
  deleteIssue(issueId){
    return this.http.delete<Issue>('http://localhost:3000/issues/' + issueId);
  }
   getIssues(){
     return this.http.get('http://localhost:3000/issues');  
 }

}

