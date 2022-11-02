import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
    else{
      this.isLoggedIn = true;
    }
  }

  title = 'Angular Frontend';
  isLoggedIn = false;
  username = "";

  loggedIn() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.username;
    return this.isLoggedIn;
  }

  logout() {
    this.authService.logout("Logged out.");
  }

}
