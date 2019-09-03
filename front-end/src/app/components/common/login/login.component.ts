import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';
import { LoginService } from './../../../services/common/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromRoot from './../../../index-reducer';
import { Store } from '@ngrx/store';
import * as ListProfileActions from './actions/list-profile.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginDetails: any;

  loginForm: FormGroup;

  obsListProfile: Observable<any>;
  subListProfile: Subscription;

  obsListProfileErr: Observable<any>;
  subListProfileErr: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private _store: Store<fromRoot.State>
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.obsListProfile = this._store.select(fromRoot.selectListProfileSuccess);
    this.obsListProfileErr = this._store.select(fromRoot.selectListProfileFailure);
  }

  ngOnInit() {
    let isOnInit = true;
    this._store.dispatch(new ListProfileActions.ListProfile());

    this.subListProfile = this.obsListProfile.subscribe(res => {
      if (res && !isOnInit) {
        console.log(res.swapInfo);
      }
    })

    this.subListProfileErr = this.obsListProfileErr.subscribe(err => {
      if (err && !isOnInit) {
        alert('false');
        console.log('error => ' + err)
      }
    })

    isOnInit = false;
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


  ngOnDestroy() {
    if (this.subListProfile) this.subListProfile.unsubscribe();
    if (this.subListProfileErr) this.subListProfileErr.unsubscribe();
  }

}
