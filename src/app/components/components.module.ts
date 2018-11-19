import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { SearchComponent } from './search/search.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { UpdateComponent } from './update/update.component';
import { AddIssueDialogComponent } from './add-issue-dialog/add-issue-dialog.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CachingInterceptor } from '../http-interceptors/caching-interceptor';
import { RestDataSource } from '../datasource/rest.datasource';
import { StaticDataSource } from '../datasource/static.datasource';
import { ProjectService } from '../services/project.service';
import { IssueService } from '../services/issue.service';

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
    LoginComponent
  ],
  providers: [
    IssueService,
    ProjectService,
    AuthService,
    AuthGuard,
    RestDataSource,
    StaticDataSource,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ]
})
export class ComponentsModule {}
