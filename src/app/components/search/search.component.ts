import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Issue} from '../../models/issue.model';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  issues: Observable<any>;
  issuesList: Issue[] = [];
  constructor(public http: HttpClient, private issueService: IssueService) {
    
  }

  ngOnInit() {
    this.getIssues();
  }
  getIssues(){
    this.issues = this.http.get('http://localhost:3000/issues');
    this.issues.subscribe(result => {
      this.issuesList = result
    });
}
  addIssue(){
    let tempIssue = new Issue;
    tempIssue.title = 'temp title';
    tempIssue.status = 'open';
    this.http.put('http://localhost:3000/issues', tempIssue);
    console.log('added issue');
    this.getIssues();
  }

  updateIssue(localIssue){
    this.issueService.issue = localIssue;
  }
}
