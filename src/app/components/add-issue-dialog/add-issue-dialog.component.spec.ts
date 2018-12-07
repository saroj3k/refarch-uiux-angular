import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddIssueDialogComponent } from './add-issue-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectService } from 'src/app/services/project.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestDataSource } from 'src/app/datasource/rest.datasource';
import { IssueService } from 'src/app/services/issue.service';
import { StaticDataSource } from 'src/app/datasource/static.datasource';

describe('AddIssueDialogComponent', () => {
  let component: AddIssueDialogComponent;
  let fixture: ComponentFixture<AddIssueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [AddIssueDialogComponent],
      providers: [
        RestDataSource,
        StaticDataSource,
        ProjectService,
        IssueService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIssueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
