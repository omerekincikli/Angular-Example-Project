import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ApiserviceService } from 'src/app/_services/apiservice.service';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent implements OnInit {

  // private showDepComp: ShowDepartmentComponent = new ShowDepartmentComponent(this.service);
  constructor(private service: ApiserviceService) { }

  @Input() depart: any;
  ID = "";
  DepartmentName = "";

  ngOnInit(): void {

    this.ID = this.depart.ID;
    this.DepartmentName = this.depart.DepartmentName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ID = this.depart.ID;
    this.DepartmentName = this.depart.DepartmentName;
   }

  addDepartment() {
    var dept = {
      ID: this.ID,
      DepartmentName: this.DepartmentName
    };
    this.service.addDepartment(dept).subscribe(res => {
      alert(res.toString());
      this.closeFunc();
    });
  }

  updateDepartment() {
    var dept = {
      ID: this.ID,
      DepartmentName: this.DepartmentName
    };
    this.service.updateDepartment(dept).subscribe(res => {
      alert(res.toString());
      this.closeFunc();
    });
  }

  closeFunc() {
    document.getElementById("closeButton")?.click();
  }
}