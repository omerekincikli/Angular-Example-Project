import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ApiserviceService {
  readonly apiUrl = 'http://localhost:50306/api/';
  readonly photoUrl = "http://localhost:50306/Photos/";

  constructor(private http: HttpClient) { }

  // Department
  getDepartmentList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Department/GetDepartment');
  }

  addDepartment(dept: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Department/AddDepartment', dept, httpOptions);
  }

  updateDepartment(dept: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'Department/UpdateDepartment/', dept, httpOptions);
  }

  deleteDepartment(deptId: number): Observable<number> {
    return this.http.delete<number>(this.apiUrl + 'Department/DeleteDepartment?id=' + deptId, httpOptions);
  }

  // Employee
  getEmployeeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Employee/GetEmployee');
  }

  addEmployee(emp: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Employee/AddEmployee', emp, httpOptions);
  }

  updateEmployee(emp: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'Employee/UpdateEmployee/', emp, httpOptions);
  }

  deleteEmployee(empId: number): Observable<number> {
    return this.http.delete<number>(this.apiUrl + 'Employee/DeleteEmployee?id=' + empId, httpOptions);
  }

  uploadPhoto(photo: any) {
    return this.http.post(this.apiUrl + 'Employee/savefile', photo);
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Employee/GetAllDepartmentNames');
  }

  updatePhotoUser(user: any) {
    return this.http.post<any>(this.apiUrl + 'User/UpdatePicture/', user, httpOptions);
  }

  uploadPhotoUser(photo: any) {
    return this.http.post(this.apiUrl + 'User/Savefile/', photo);
  }

}
