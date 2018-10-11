import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Issue } from '../../models/issue.model';

@Component({
  selector: 'app-add-issue-dialog',
  templateUrl: './add-issue-dialog.component.html',
  styleUrls: ['./add-issue-dialog.component.css']
})
export class AddIssueDialogComponent {

  projects: Project[] = [];
  priorities: string[] = ['Nice to have', 'Must have', 'Production'];
  issue: Issue = new Issue();

  addIssueForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    project: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<AddIssueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private projectService: ProjectService) { 
      this.getProjects();
    }

    getProjects(){
     this.projectService.projects.subscribe(results => {
       this.projects = results;
     })
    }

    onSubmit(){
      console.log('Submit');
    }

    get title () {
      return this.addIssueForm.get('title');
    }

    get description(){
      return this.addIssueForm.get('description');
    }

    get project(){
      return this.addIssueForm.get('project');
    }

    get priority(){
      return this.addIssueForm.get('priority');
    }
    
}
