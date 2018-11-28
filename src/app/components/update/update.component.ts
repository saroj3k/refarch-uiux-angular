import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Issue } from '../../models/issue.model';
import { IssueService } from '../../services/issue.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private currentIssue: Issue;
  private updateIssueForm;

  constructor(
    private router: Router,
    private authService: AuthService,
    private issueService: IssueService
  ) {
    if (!this.issueService.issue) {
      router.navigate(['search']);
    } else {
      this.currentIssue = this.issueService.issue;
    }
  }

  ngOnInit() {
    this.updateIssueForm = new FormGroup({
      title: new FormControl(this.currentIssue.title, Validators.required),
      assignee: new FormControl(
        this.currentIssue.assignee,
        Validators.required
      ),
      priority: new FormControl(
        this.currentIssue.priority,
        Validators.required
      ),
      status: new FormControl(this.currentIssue.status, Validators.required),
      project: new FormControl(this.currentIssue.project, Validators.required),
      description: new FormControl(
        this.currentIssue.description,
        Validators.required
      )
    });
  }

  onSubmit() {
    const updatedIssue = { ...this.currentIssue };
    updatedIssue.title = this.updateIssueForm.get('title').value;
    updatedIssue.assignee = this.updateIssueForm.get('assignee').value;
    updatedIssue.priority = this.updateIssueForm.get('priority').value;
    updatedIssue.status = this.updateIssueForm.get('status').value;
    updatedIssue.description = this.updateIssueForm.get('description').value;
    updatedIssue.project = this.updateIssueForm.get('project').value;

    // Check if changes have been made to the issue
    if (
      !_.isEqual(
        JSON.stringify(updatedIssue),
        JSON.stringify(this.currentIssue)
      )
    ) {
      // Changes have been made; set last updated and patch
      updatedIssue.dateLastUpdated = moment()
        .format('MM/DD/YYYY')
        .toString();

      /**
       * Notice that 'then' is called on the service method.
       * This is because the service is returning a Promise,
       * which results in an asynchronous callback function
       * instead of returning the data directly.
       * @see {@link IssueService}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
       */
      this.issueService.updateIssue(updatedIssue).then(result => {
        console.log(result);
        this.router.navigate(['search']);
      });
    } else {
      // No changes made; route back to search page
      this.router.navigate(['search']);
    }
  }
}
