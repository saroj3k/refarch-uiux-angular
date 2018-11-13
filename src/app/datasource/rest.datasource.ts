import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';

@Injectable()
export class RestDataSource {
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:3000/projects');
  }
}
