import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIssueDialogComponent } from './add-issue-dialog.component';

describe('AddIssueDialogComponent', () => {
  let component: AddIssueDialogComponent;
  let fixture: ComponentFixture<AddIssueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIssueDialogComponent ]
    })
    .compileComponents();
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
