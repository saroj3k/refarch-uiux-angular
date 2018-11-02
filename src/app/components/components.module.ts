import { NgModule } from "@angular/core";
import { MaterialModule } from "../shared/material.module";
import { SearchComponent } from "./search/search.component";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from "../app-routing/app-routing.module";
import { UpdateComponent } from "./update/update.component";
import { IssueService } from "../services/issue.service";
import { AddIssueDialogComponent } from "./add-issue-dialog/add-issue-dialog.component";
import { ProjectService } from "../services/project.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth-guard.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth.interceptor";

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  entryComponents: [AddIssueDialogComponent],
  declarations: [
    SearchComponent,
    UpdateComponent,
    AddIssueDialogComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent
  ],
  providers: [
    IssueService,
    ProjectService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class ComponentsModule {}
