import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  private signupForm;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  onSubmit(form: NgForm) {
    // const email = this.signupForm.get("email").value;
    // const password = this.signupForm.get("password").value;
    // this.authService.login(email, password);
    this.router.navigate(["search"]);
  }
}
