import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../interfaces/User";

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {
  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(public http: HttpClient) {
  }

  public login(user: User) {

    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.post(this.apiUrl + '/login', user, settings);
  }

  public signUp(user: User) {

    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.post(this.apiUrl + '/users', user, settings);
  }
<<<<<<< HEAD

  public getUsername() {

  }

=======
>>>>>>> c1e3d2cc007483e9272c2eeb5d99849abe32a2da
}
