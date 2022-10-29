import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  title = 'Angular Frontend';

  loggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout("Logged out.");
  }

}
