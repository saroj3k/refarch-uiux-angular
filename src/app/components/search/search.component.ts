import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Issue} from '../../models/issue.model';
import { IssueService } from '../../services/issue.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AddIssueDialogComponent } from '../add-issue-dialog/add-issue-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  issues: Observable<any>;
  dataSource = new MatTableDataSource<Issue>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['title', 'owner', 'priority', 'status', 'description', 'dateCreated', 'dateLastUpdated', 'closed', 'dateClosed', 'project', 'action'];
  constructor(public http: HttpClient, private issueService: IssueService, private dialog: MatDialog) {
    
  }

  ngOnInit() {
    this.getIssues();
  }

  getIssues(){
    this.issues = this.http.get('http://localhost:3000/issues');
    this.issues.subscribe(result => {
      this.dataSource = new MatTableDataSource<Issue>(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
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

  openAddIssueDialog(){
    this.dialog.open(AddIssueDialogComponent, {
      disableClose: true,
      width: '300px'
    });
  }
  }

