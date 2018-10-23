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
  dataSource = new MatTableDataSource<Issue>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['title', 'owner', 'priority', 'status', 'description', 'dateCreated', 'dateLastUpdated', 'closed', 'dateClosed', 'project', 'updateAction', 'deleteAction'];
  constructor(public http: HttpClient, private issueService: IssueService, private dialog: MatDialog) {
    
  }

  ngOnInit() {
    this.getIssues();
  }

  getIssues(){
     this.issueService.issues = this.issueService.getIssues();
     this.issueService.issues.subscribe(result => {
      this.dataSource = new MatTableDataSource<Issue>(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  

  deleteIssue(localIssue: Issue){
    this.issueService.deleteIssue(localIssue.id).subscribe(() => this.getIssues());
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

