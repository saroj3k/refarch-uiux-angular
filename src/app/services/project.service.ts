import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../components/auth/auth.service";
import { Project } from "../models/project.model";

@Injectable()
export class ProjectService {
  constructor(
    private httpClient: HttpClient,
    public authService: AuthService
  ) {}

  getProjects() {
    return this.httpClient.get<Project[]>("http://localhost:3000/projects", {
      headers: { Authorization: "Bearer " + this.authService.getToken() }
    });
  }
}
