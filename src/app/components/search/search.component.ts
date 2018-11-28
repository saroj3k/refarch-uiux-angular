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
import { IssueService } from '../../services/issue.service';

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
    private issueService: IssueService
  ) {
    /**
     * Subscribe to the Observable stream in the service.
     * This lets the component receive updates when a new Issue is added from the modal,
     * o it can get the latest issues.
     * This was done since there was no routing between the modal and the main page.
     */
    this.issueService.issueAdded$.subscribe(() => {
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

  /**
   * Notice that 'then' is called on the service methods.
   * This is because the service is returning a Promise,
   * which results in an asynchronous callback function
   * instead of returning the data directly.
   * @see {@link IssueService}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
   */
  getIssues() {
    this.issueService.getIssues().then(issues => {
      this.dataSource = new MatTableDataSource<Issue>(issues);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Calls the service method to delete an issue.
   * @param localIssue The issue referenced from the HTML
   */
  deleteIssue(localIssue: Issue) {
    this.issueService.deleteIssue(localIssue.id).then(() => {
      this.getIssues();
    });
  }

  /**
   * Stores the current local issue in the service.
   * This allows the service to access the current issue after being routed to /update.
   * Another method could involve having a dynamic route that references the issue ID
   * i.e. /update/123
   * @param localIssue The issue referenced from the HTML
   */
  onUpdateClick(localIssue) {
    this.issueService.issue = localIssue;
  }

  openAddIssueDialog() {
    this.dialog.open(AddIssueDialogComponent, {
      disableClose: true,
      width: '300px'
    });
  }
}
