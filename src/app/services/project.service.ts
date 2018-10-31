import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "../models/project.model";
import { AuthService } from "../components/auth/auth.service";

@Injectable()
export class ProjectService{

    projects: Observable<any>;

    constructor(private httpClient: HttpClient, public authService: AuthService){
        this.getProjects();
    }

    getProjects(){
      this.projects = this.httpClient.get('http://localhost:3000/projects',{
        headers: {'Authorization': 'Bearer ' + this.authService.getToken()}
      });
    }
}