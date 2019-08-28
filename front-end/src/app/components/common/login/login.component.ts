import { Router } from '@angular/router';
import { LoginService } from './../../../services/common/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails: any;

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }


  login() {

    if (this.loginForm.valid) {
      let obj = this.loginForm.value;
      this.loginService.login(obj).subscribe(result => {
        if (result) {
          localStorage.setItem('token', result['token']);
          alert('login success')
          // this.loginDetails = result['user'];
          // localStorage.setItem('username', this.loginDetails[0]['userName']);

          if (result['user']['role'] == 'ADMIN')
            this.router.navigate(['/admin-dashboard']);
          else if (result['user']['role'] == 'DOCTOR')
            this.router.navigate(['/doctor-dashboard']);
          else if (result['user']['role'] == 'PATIENT')
            this.router.navigate(['/patient-dashboard']);
        }
      }, error => {
        alert(error.error);
      }
      )
    }
    else {
      <any>Object.values(this.loginForm.controls).forEach(controls =>
        controls.markAllAsTouched()
      )
    }

  }

}
