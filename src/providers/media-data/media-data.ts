import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  public getMediaFiles(page: number, numberOfFilesPerRequest: number) {
    const start = page * numberOfFilesPerRequest;
    return this.http.get(this.apiUrl + `/media?start=${start}&limit=${numberOfFilesPerRequest}`);
  }

  public getMediaFilesOfCurrentUser(page: number, numberOfFilesPerRequest: number) {
    const start = page * numberOfFilesPerRequest;
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    }
    return this.http.get(this.apiUrl + '/media/user', settings);
  }
}
