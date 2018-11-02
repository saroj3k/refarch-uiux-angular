import { Injectable } from "@angular/core";
import { reject } from "q";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { invalid } from "moment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedIn = false;
  public token;
  constructor(public http: HttpClient, private router: Router) {}
  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 100);
    });
    return promise;
  }
  login(email, password) {
    const httpParams = { email: email, password: password };
    this.http
      .post("http://localhost:3000/auth/login", httpParams)
      .subscribe((response: any) => {
        this.token = response.access_token;
        this.loggedIn = true;
      });
    console.log(this.token);
  }
  logout() {
    this.token = "";
    this.loggedIn = false;
    this.router.navigate(["login"]);
  }
  getToken() {
    return this.token;
  }
}
