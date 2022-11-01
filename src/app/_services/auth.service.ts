import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AlertifyService } from "./alertify.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  readonly apiUrl = 'http://localhost:50306/api/User/';
  loggedIn: boolean = false;

  login(model: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.apiUrl + "Authenticate", model, httpOptions).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          var keyObj = { token: user.Token, userId: user.ID, timestamp: Date.now() }
          localStorage.setItem("key", JSON.stringify(keyObj));
          this.loggedIn = true;
        }
      })
    );
  }

  // register(model: any) {
  //   return this.http.post(environment.baseUrl + "Register", model);
  // }

  isLoggedIn() {
    var keyStr = localStorage.getItem("key");
    if (keyStr == null) {
      this.loggedIn = false;
      return false;
    }
    var keyObj = JSON.parse(keyStr);
    return this.compareTime(keyObj)
  }

  logout(msg: string) {
    localStorage.removeItem("key");
    this.loggedIn = false;
    this.alertify.warning(msg);
    this.router.navigate(['/login']);
  }

  compareTime(keyObj: any) {
    if (keyObj.timestamp + (60 * 60 * 1000) > Date.now()) {
      keyObj.timestamp = Date.now();
      localStorage.setItem("key", JSON.stringify(keyObj));
      this.loggedIn = true;
      return true;
    }
    else {
      this.logout("Session expired. You should re-login.");
      return false;
    }

  }

}
