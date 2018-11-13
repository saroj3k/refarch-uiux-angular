import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Observable, from } from 'rxjs';

@Injectable()
export class StaticDataSource {
  private projects: Project[] = [
    {
      title: 'Accessorials',
      team: 'Pricing'
    },
    {
      title: 'Trailer Prioritization',
      team: 'Linehaul'
    },
    {
      title: 'Walkplan',
      team: 'Linehaul'
    },
    {
      title: 'Driver Availability',
      team: 'Linehaul'
    }
  ];

  getProjects(): Observable<Project[]> {
    return from([this.projects]);
  }
}
