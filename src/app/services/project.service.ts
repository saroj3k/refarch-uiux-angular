import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  getProjects() {
    return this.httpClient.get<Project[]>('http://localhost:3000/projects');
  }
}
