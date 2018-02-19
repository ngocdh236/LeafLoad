<<<<<<< HEAD
import {HttpClient, HttpHeaders} from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http';
>>>>>>> c1e3d2cc007483e9272c2eeb5d99849abe32a2da
import { Injectable } from '@angular/core';

/*
  Generated class for the MediaDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaDataProvider {
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public http: HttpClient) {
  }

/*  public getAllMedia() {
    return this.http.get(this.apiUrl + '/media?start=50&limit=50');
  }*/

  public getMediaFiles(page: number, numberOfFilesPerRequest: number) {
    const start = page * numberOfFilesPerRequest;
    return this.http.get(this.apiUrl + `/media?start=${start}&limit=${numberOfFilesPerRequest}`);
  }

<<<<<<< HEAD
  public getMediaFilesOfCurrentUser(page: number, numberOfFilesPerRequest: number) {
    const start = page * numberOfFilesPerRequest;
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    }
    return this.http.get(this.apiUrl + '/media/user', settings);
  }
=======
>>>>>>> c1e3d2cc007483e9272c2eeb5d99849abe32a2da
}
