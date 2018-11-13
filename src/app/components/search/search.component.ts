import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from '@angular/material';
import { AddIssueDialogComponent } from '../add-issue-dialog/add-issue-dialog.component';
import { Issue } from '../../models/issue.model';
import { AuthService } from '../auth/auth.service';
import { IssueRepository } from 'src/app/repository/issue.repository';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataSource = new MatTableDataSource<Issue>();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  displayedColumns: string[] = [
    'title',
    'assignee',
    'priority',
    'status',
    'description',
    'dateCreated',
    'dateLastUpdated',
    'project'
  ];

  constructor(
    public http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService,
    private issueRepo: IssueRepository
  ) {
    this.issueRepo.issueAdded$.subscribe(() => {
      this.getIssues();
    });
    if (this.authService.getrole() === 'admin') {
      this.displayedColumns.push('updateAction', 'deleteAction');
    }
    if (this.authService.getrole() === 'user') {
      this.displayedColumns.push('viewAction');
    }
  }

  ngOnInit() {
    this.getIssues();
  }

  getIssues() {
    this.issueRepo.getIssues().then(issues => {
      this.dataSource = new MatTableDataSource<Issue>(issues);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteIssue(localIssue: Issue) {
    this.issueRepo.deleteIssue(localIssue.id).then(() => {
      this.getIssues();
    });
  }

  onUpdateClick(localIssue) {
    this.issueRepo.issue = localIssue;
  }

  openAddIssueDialog() {
    this.dialog.open(AddIssueDialogComponent, {
      disableClose: true,
      width: '300px'
    });
  }
}
