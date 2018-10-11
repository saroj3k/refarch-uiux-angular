import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "../models/project.model";

@Injectable()
export class ProjectService{

    projects: Observable<any>;

    constructor(private httpClient: HttpClient){
        this.getProjects();
    }

    getProjects(){
      this.projects = this.httpClient.get('http://localhost:3000/projects');
    }
}