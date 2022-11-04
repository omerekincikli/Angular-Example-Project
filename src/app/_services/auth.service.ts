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
  username = "";
  ID = "";
  photoFileName = "";

  login(model: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.apiUrl + "Authenticate", model, httpOptions).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          var keyObj = { token: user.Token, username: user.Username, timestamp: Date.now(), ID: user.ID, photoFileName:user.PhotoFileName }
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
      this.username = keyObj.username;
      this.ID = keyObj.ID;
      this.photoFileName = keyObj.photoFileName;
      return true;
    }
    else {
      this.logout("Session expired. You should re-login.");
      return false;
    }
  }

}
