import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<Project[]>('http://localhost:3000/projects');
  }
}
