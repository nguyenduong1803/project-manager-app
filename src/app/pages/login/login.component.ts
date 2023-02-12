import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
      password: ["", Validators.required, Validators.minLength(4)],
      email: [
        "",
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"),
      ],
    });
  }
  onSubmit() {
    const email = this.loginForm.get("email").value;
    const password = this.loginForm.get("password").value;
    console.log(email);
    if (email && password) {
      this.auth.handleLogin({
        email,
        password,
      });
    }
    console.log(this.loginForm.get("email"));
    console.log(this.loginForm.get("password"));
  }
  ngOnInit() {
    const token = localStorage.getItem("access_token");
    console.log(token);
    if (!this.auth.isAuthenticated) {
      console.log("run ver");
      this.auth.handleVerifyToken();
    }
  }
}
