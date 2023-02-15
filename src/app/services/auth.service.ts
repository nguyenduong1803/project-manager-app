import { baseURL } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TypeUser } from "app/types/user.type";

const AUTH_ENPOINT = {
  LOGIN: "auths/login",
  VERIFY_TOKEN: "auths/verifyToken",
  GET_ALL: "auths",
};
type formData = {
  email: string;
  password: string;
};
@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: TypeUser;
  constructor(private http: HttpClient, private router: Router) {}
  login(body: formData): Observable<any> {
    return this.http.post(baseURL + AUTH_ENPOINT.LOGIN, body);
  }
  getAll(): Observable<any> {
    return this.http.get(baseURL + AUTH_ENPOINT.GET_ALL);
  }
  logout() {
    this.user = null;
    this.router.navigate(["/login"]);
    localStorage.removeItem("access_token");
  }
  verify_token(): Observable<any> {
    const token = localStorage.getItem("access_token");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.post(
      baseURL + AUTH_ENPOINT.VERIFY_TOKEN,
      {
        type: "registed",
      },
      { headers }
    );
  }
  handleVerifyToken() {
    this.verify_token().subscribe(async (data) => {
      this.user = { ...data.data };
      this.isAuthenticated = true;
      this.router.navigate(["/dashboard"]);
    });
  }
  handleLogin(body: formData) {
    this.login(body).subscribe(
      async (data) => {
        await Swal.fire({
          icon: "success",
          title: "Login thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        this.isAuthenticated = true;
        this.user = data.user;
        localStorage.setItem("access_token", data.token);
        this.router.navigate(["dashboard"]);
      },
      async () => {
        await Swal.fire({
          icon: "error",
          title: "Login thất bại",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }

  public isAuthenticated = false;
}
