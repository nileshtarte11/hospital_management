import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../services//admin/admin.service';


@Component({
  selector: 'app-admin-patient',
  templateUrl: './admin-patient.component.html',
  styleUrls: ['./admin-patient.component.css']
})
export class AdminPatientComponent implements OnInit {

  patients: [];

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.getPatient();
  }

  getPatient() {
    this.adminService.getPatient().subscribe(res => {
      if (res) {
        this.patients = res['patients'];
      }
      else {
        this.patients = [];
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    })
  }

  deletePatient(id) {
    this.adminService.deletePatient(id).subscribe(res => {
      if (res) {
        alert('Patient Deleted successfully');
        let index = this.patients.findIndex(obj => obj['_id'] == res['user']['_id']);
        if (index !== -1) {
          this.patients.splice(index, 1);
        }
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    })
  }

}
