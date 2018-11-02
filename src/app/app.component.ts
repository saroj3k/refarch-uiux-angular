import { Component } from "@angular/core";
import { HeaderService, Page } from "od-internal-header";
import { AuthService } from "./components/auth/auth.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  constructor(
    public headerService: HeaderService,
    public authService: AuthService
  ) {
    const search = new Page();
    search.title = "Issue Tracker";
    search.routerLink = "search";
    const login = new Page();
    login.title = "Login";
    login.routerLink = "login";
    const signup = new Page();
    signup.title = "Sign Up";
    signup.routerLink = "signup";
    headerService.pageList.push(search);
    headerService.pageList.push(login);
    headerService.pageList.push(signup);
    headerService.applicationGroupTitle = "Group Title";
  }
  onLogin() {
    //this.authService.login();
  }
  onLogout() {
    this.authService.logout();
  }
}
