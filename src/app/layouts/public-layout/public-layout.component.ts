import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: "public-layout",
  templateUrl: "./public-layout.component.html",
})
export class PublicLayoutComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem("access_token");
    console.log(token);
    if (!this.auth.isAuthenticated) {
      console.log("run ver");
      this.auth.handleVerifyToken();
    }
  }
}
