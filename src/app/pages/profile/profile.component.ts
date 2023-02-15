import { AuthService } from "app/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { TypeUser } from "app/types/user.type";

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  user: TypeUser;
  constructor(private auth: AuthService) {
    this.user = this.auth.user;
  }

  ngOnInit(): void {}
}
