import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private api = "http://localhost:4000/api/";
  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    return this.http.get(`${this.api}login`);
  }
  public isAuthenticated = true;
}
