import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";

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
  constructor(private fb: FormBuilder) {
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
    console.log(this.loginForm.value);
  }
  ngOnInit() {}
}
