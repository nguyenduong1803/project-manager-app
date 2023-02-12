import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "app/services/auth.service";
import { TypeUser } from "app/types/user.type";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
  user: TypeUser;
  constructor(private auth: AuthService) {
    this.user = this.auth.user;
  }
  ngOnInit() {}
}
