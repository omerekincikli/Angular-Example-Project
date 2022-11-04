import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void { }

  username = this.authService.username;
  photoUrl = "http://localhost:50306/Photos/" + this.authService.photoFileName;
}
