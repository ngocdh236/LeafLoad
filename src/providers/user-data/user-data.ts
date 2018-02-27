import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../interfaces/User";
import { ENV } from '@environment';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {
  apiUrl = ENV.API_BASE_URL;
  loginUrl = `${this.apiUrl}/login`;
  signUpUrl = `${this.apiUrl}/users`;

  constructor(public http: HttpClient) {
  }

  public login(user: User) {

    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.post(this.loginUrl, user);
  }

  public signUp(user: User) {

    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.post(this.signUpUrl, user);
  }

  public requestUserInfoByUserId(userId: number) {
    const requestUserInfoUrl = `${this.apiUrl}/users/${userId}`;
    return this.http.get(requestUserInfoUrl)
  }
}
