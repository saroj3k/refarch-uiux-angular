import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Issue } from '../../models/issue.model';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private currentIssue: Issue;
  private updateIssueForm;

  constructor(private issueService: IssueService, private router: Router) {
    if (!issueService.issue) {
      router.navigate(['search']);
    } else {
      this.currentIssue = issueService.issue;
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
    let updatedIssue = { ...this.currentIssue };
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
      this.issueService.updateIssue(updatedIssue).subscribe(() => {
        this.router.navigate(['search']);
      });
    } else {
      // No changes made; route back to search page
      this.router.navigate(['search']);
    }
  }
}
