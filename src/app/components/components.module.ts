import { NgModule } from "@angular/core";
import { MaterialModule } from "../shared/material.module";
import { SearchComponent } from './search/search.component';
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AddComponent } from './add/add.component';
import { AppRoutingModule } from "../app-routing/app-routing.module";
import { UpdateComponent } from './update/update.component';
import { IssueService } from "../services/issue.service";

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        FlexLayoutModule,
        AppRoutingModule
    ],
   exports:[],
   declarations: [SearchComponent, AddComponent, UpdateComponent],
   providers:[IssueService]
    })
export class ComponentsModule{}