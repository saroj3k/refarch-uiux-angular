import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * Service for handling authentication actions.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  private token;
  private role;
  constructor(public http: HttpClient, private router: Router) {}

  /**
   * Returns if a user is authenticated or not.
   */
  isAuthenticated() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 100);
    });
    return promise;
  }
  /**
   * Sends a login request to the authentication server.
   * @param email The user email
   * @param password The user password
   */
  login(email, password) {
    const httpParams = { email: email, password: password };
    this.http
      .post('http://localhost:3000/auth/login', httpParams)
      .subscribe((response: any) => {
        this.token = response.access_token;
        this.role = response.role;
        this.loggedIn = true;
      });
  }
  /**
   * Clears the JWT and logs out the user.
   */
  logout() {
    this.token = '';
    this.loggedIn = false;
    this.router.navigate(['login']);
  }
  /**
   * Returns the JWT auth token.
   */
  getToken() {
    return this.token;
  }
  /**
   * Returns the role of the user. Used for
   * determining levels of access based on role.
   */
  getRole() {
    return this.role;
  }
}
