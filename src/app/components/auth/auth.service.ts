import { Injectable } from '@angular/core';
import { reject } from 'q';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  public token;
  constructor(public http: HttpClient){}
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      } 
    );
    return promise;
  }
  login(email, password) {
    const httpParams = {'email': email, 'password': password};
    this.http.post('http://localhost:3000/auth/login', httpParams).subscribe((response: any) => {
    this.token =  response.access_token;
    });
    console.log(this.token);
  }
  logout(){
    this.loggedIn = false;
  }
  getToken(){
    return this.token;
  }
}
