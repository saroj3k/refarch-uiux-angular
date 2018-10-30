import { TestBed, inject, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let injector: TestBed;
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    injector = getTestBed();
    service = injector.get(ProjectService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getProjects', () => {
    it('should return an Observable<Project[]>', () => {
      const dummyProjects = [
        {
          title: 'Accessorials',
          team: 'Pricing'
        },
        {
          title: 'Trailer Prioritization',
          team: 'Linehaul'
        }
      ];

      service.getProjects().subscribe(projects => {
        expect(projects.length).toBe(2);
        expect(projects).toEqual(dummyProjects);
      });

      const req = httpMock.expectOne('http://localhost:3000/projects');
      expect(req.request.method).toBe('GET');
      req.flush(dummyProjects);
    });
  });
});
