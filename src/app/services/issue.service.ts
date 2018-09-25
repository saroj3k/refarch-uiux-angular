import { Injectable } from '@angular/core';
import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  issue: Issue;
  constructor() { }
}
