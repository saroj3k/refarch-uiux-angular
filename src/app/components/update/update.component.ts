import { Component, OnInit } from "@angular/core";
import { IssueService } from "../../services/issue.service";
import { Issue } from "../../models/issue.model";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"]
})
export class UpdateComponent implements OnInit {
  private currentIssue: Issue;
  constructor(private issueService: IssueService, private router: Router) {
    if (issueService.issue == undefined) {
      router.navigate(["search"]);
    } else {
      this.currentIssue = issueService.issue;
    }
  }

  updateIssueForm = new FormGroup({
    description: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required)
  });

  ngOnInit() {}

  onSubmit() {
    let updatedIssue = this.currentIssue;
    updatedIssue.description = this.updateIssueForm.get("description").value;
    updatedIssue.status = this.updateIssueForm.get("status").value;
    updatedIssue.dateLastUpdated = moment()
      .format("MM/DD/YYYY")
      .toString();

    this.issueService.updateIssue(updatedIssue).subscribe(() => {
      this.router.navigate(["search"]);
    });
  }
}
