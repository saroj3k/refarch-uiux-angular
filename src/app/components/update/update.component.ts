import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  constructor(private issueService: IssueService, private router: Router) { 
    if(issueService.issue == undefined){
      router.navigate(['search']);
    }
  }

  ngOnInit() {
  }

}
