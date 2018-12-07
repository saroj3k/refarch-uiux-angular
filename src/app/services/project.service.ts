import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { RestDataSource } from '../datasource/rest.datasource';
// import { StaticDataSource } from '../datasource/static.datasource';

/**
 * The service methods return a Promise. Since subcribing to Observables is Asyncronous,
 * this was done to ensure the service waits until it retrieves everything from the datasource
 * before resolving (successfully returning) the data.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
 */
@Injectable()
export class ProjectService {
  constructor(private dataSource: RestDataSource) {}

  /**
   * Gets all Projects from the REST datasource.
   */
  getProjects(): Promise<Project[]> {
    return new Promise<Project[]>(resolve => {
      this.dataSource.getProjects().subscribe(data => {
        resolve(data);
      });
    });
  }
}
