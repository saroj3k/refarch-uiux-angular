import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Project } from '../../models/project.model';
import { Issue } from '../../models/issue.model';
import { IssueService } from '../../services/issue.service';
import { ProjectRepository } from 'src/app/repository/project.repository';

@Component({
  selector: 'app-add-issue-dialog',
  templateUrl: './add-issue-dialog.component.html',
  styleUrls: ['./add-issue-dialog.component.css']
})
export class AddIssueDialogComponent {
  priorities: string[] = ['P0', 'P1', 'P2', 'P3', 'P4'];
  issue: Issue = new Issue();
  projects: Project[];

  addIssueForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    project: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<AddIssueDialogComponent>,
    public issueService: IssueService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectRepo: ProjectRepository
  ) {
    this.projectRepo.getProjects().then(resolvedProjects => {
      this.projects = resolvedProjects;
    });
  }

  onSubmit() {
    const newIssue: Issue = new Issue();
    newIssue.title = this.title.value;
    newIssue.description = this.description.value;
    newIssue.project = this.project.value;
    newIssue.priority = this.priority.value;
    newIssue.assignee = '<Unassigned>';
    newIssue.status = 'New';

    const currentDate = moment()
      .format('MM/DD/YYYY')
      .toString();
    newIssue.dateCreated = currentDate;
    newIssue.dateLastUpdated = currentDate;

    this.issueService.addIssue(newIssue).subscribe(() => {
      this.dialogRef.close();

      // Send to subsriber to get latest changes
      this.issueService.confirmIssueAdded();
    });
  }

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
