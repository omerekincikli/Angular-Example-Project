import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    }
  }

  model: any={};
  isLoggedIn = this.authService.loggedIn;

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.isLoggedIn = true;
        this.alertify.success("Successfully logged in.");
        this.router.navigate(['/']);
      },
      error => {
        this.alertify.error("Username or password is wrong.");
      }
    );
  }

}
