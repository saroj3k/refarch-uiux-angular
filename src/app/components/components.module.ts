import { NgModule } from "@angular/core";
import { MaterialModule } from "../shared/material.module";
import { SearchComponent } from './search/search.component';
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from "../app-routing/app-routing.module";
import { UpdateComponent } from './update/update.component';
import { IssueService } from "../services/issue.service";
import { AddIssueDialogComponent } from './add-issue-dialog/add-issue-dialog.component';
import { ProjectService } from "../services/project.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        FlexLayoutModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
   exports:[],
   entryComponents:[
    AddIssueDialogComponent
  ],
   declarations: [SearchComponent, UpdateComponent, AddIssueDialogComponent],
   providers:[IssueService, ProjectService]
    })
export class ComponentsModule{}