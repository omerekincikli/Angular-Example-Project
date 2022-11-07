import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ApiserviceService } from 'src/app/_services/apiservice.service';
import { AuthService } from 'src/app/_services/auth.service';
import { RandomService } from 'src/app/_services/random.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(
    private service: ApiserviceService,
    private alertify: AlertifyService,
    private auth: AuthService,
    private random: RandomService,
  ) { }

  ngOnInit(): void {
  }

  PhotoFilePath = "http://localhost:50306/Photos/" + this.auth.photoFileName;
  PhotoFileName = "";

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    var filename = this.random.randomString(10) + "." + file.name.split(".").pop();
    const formData: FormData = new FormData();
    formData.append('file', file, filename);

    this.service.uploadPhotoUser(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    })
  }

  saveChanges() {
    var user = {
      ID: this.auth.ID,
      PhotoFileName: this.PhotoFileName
    };

    this.service.updatePhotoUser(user).subscribe(res => {
      this.auth.photoFileName = user.PhotoFileName;
      this.alertify.success("Picture updated.");
      this.auth.logout("You should re-login.");
    });
  }

}
