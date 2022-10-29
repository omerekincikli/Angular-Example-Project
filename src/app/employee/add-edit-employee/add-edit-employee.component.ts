import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ApiserviceService } from 'src/app/_services/apiservice.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  constructor(
    private service: ApiserviceService,
    private alertify: AlertifyService,
  ) { }
  @Input() emp: any;
  ID = "";
  EmployeeName = "";
  Department = "";
  DOJ = "";
  PhotoFileName = "";
  PhotoFilePath = "";
  DepartmentList: any = [];


  ngOnInit(): void {
    this.loadEmployeeList();
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.loadEmployeeList(); 
  }

  loadEmployeeList() {

    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;

      this.ID = this.emp.ID;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DOJ = this.emp.DOJ;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    });
  }

  addEmployee() {
    var val = {
      ID: this.ID,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DOJ: this.DOJ,
      PhotoFileName: this.PhotoFileName
    };

    this.service.addEmployee(val).subscribe(res => {
      this.alertify.success(res.toString());
      this.closeFunc();
    });
  }

  updateEmployee() {
    var val = {
      ID: this.ID,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DOJ: this.DOJ,
      PhotoFileName: this.PhotoFileName
    };

    this.service.updateEmployee(val).subscribe(res => {
      this.alertify.success(res.toString());
      this.closeFunc();
    });
  }


  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    })
  }

  closeFunc() {
    document.getElementById("closeButton")?.click();
  }
}
