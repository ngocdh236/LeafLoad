import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../../interfaces/User";
import { ENV } from '@environment';

@Injectable()
export class UserDataProvider {
  apiUrl = ENV.API_BASE_URL;
  loginUrl = `${this.apiUrl}/login`;
  signUpUrl = `${this.apiUrl}/users`;

  constructor(public http: HttpClient) {
  }

  public login(user: User) {
    return this.http.post(this.loginUrl, user);
  }

  public signUp(user: User) {
    return this.http.post(this.signUpUrl, user);
  }

  public requestUserInfoByUserId(userId: number) {
    const requestUserInfoUrl = `${this.apiUrl}/users/${userId}`;
    return this.http.get(requestUserInfoUrl);
  }

  public updateUserInfo(newInfo: any) {
    const requestURL= `${this.apiUrl}/users`;
    return this.http.put(requestURL, newInfo);
  }

  public requestCurrentUserInfo() {
    const requestURL= `${this.apiUrl}/users/user`;
    return this.http.get(requestURL);
  }
}
