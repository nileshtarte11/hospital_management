import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = "login";

  constructor(
    private http: HttpClient,
  ) { }

  login(data) {
    return this.http.post(environment.backendUrl + this.loginUrl, data);
  }

  getProfilesList() {
    return this.http.get('http://www.mocky.io/v2/5d6e08003200005000a8a517');
  }

}
