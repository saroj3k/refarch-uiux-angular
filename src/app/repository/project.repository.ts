import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { RestDataSource } from '../datasource/rest.datasource';
// import { StaticDataSource } from '../datasource/static.datasource';

@Injectable()
export class ProjectRepository {
  constructor(private dataSource: RestDataSource) {}

  getProjects(): Promise<Project[]> {
    return new Promise<Project[]>(resolve => {
      this.dataSource.getProjects().subscribe(data => {
        resolve(data);
      });
    });
  }
}
