import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import uuidv4 from 'uuid/v4';
import { Project } from '../../models/project.model';
import { Issue } from '../../models/issue.model';
import { IssueService } from '../../services/issue.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-issue-dialog',
  templateUrl: './add-issue-dialog.component.html',
  styleUrls: ['./add-issue-dialog.component.css']
})
export class AddIssueDialogComponent {
  priorities: string[] = ['P0', 'P1', 'P2', 'P3', 'P4'];
  issue: Issue = new Issue();
  projects: Project[];

  // Define the form group which is bound in the HTML
  addIssueForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    project: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<AddIssueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private issueService: IssueService
  ) {
    this.projectService.getProjects().then(resolvedProjects => {
      this.projects = resolvedProjects;
    });
  }

  /**
   * Called when the form is submitted. Takes the data from the form,
   * creates a new Issue and sends it to the service, which then Posts
   * it to the datasource.
   */
  onSubmit() {
    const newIssue: Issue = new Issue();
    newIssue.title = this.title.value;
    newIssue.description = this.description.value;
    newIssue.project = this.project.value;
    newIssue.priority = this.priority.value;
    newIssue.assignee = '<Unassigned>';
    newIssue.status = 'New';
    newIssue.id = uuidv4();

    const currentDate = moment()
      .format('MM/DD/YYYY')
      .toString();
    newIssue.dateCreated = currentDate;
    newIssue.dateLastUpdated = currentDate;

    /**
     * Notice that 'then' is called on the service methods.
     * This is because the service is returning a Promise,
     * which results in an asynchronous callback function
     * instead of returning the data directly.
     * @see {@link IssueService}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
     */
    this.issueService.addIssue(newIssue).then(() => {
      this.dialogRef.close();
      this.issueService.confirmIssueAdded();
    });
  }

  /**
   * Helper methods for getting the data from the form group.
   */
  get title() {
    return this.addIssueForm.get('title');
  }

  get description() {
    return this.addIssueForm.get('description');
  }

  get project() {
    return this.addIssueForm.get('project');
  }

  get priority() {
    return this.addIssueForm.get('priority');
  }
}
