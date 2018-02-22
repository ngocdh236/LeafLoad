import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@environment';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the MediaDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaDataProvider {
  apiUrl = ENV.API_BASE_URL;
  mediaURL = `${this.apiUrl}/uploads/`;
  searchURL = `${this.apiUrl}/media/search/`;

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

  public searchMediaFiles(keyWord: string) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')).set('Conten-Type', 'application/x-www-form-urlencoded')
    }
    const dictValue = {title: `${keyWord}`, description: `${keyWord}`};
    return this.http.post(this.searchURL, dictValue);
  }

  public likeMediaFile(file_id: number) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    }
    const body = {
      file_id: file_id
    }
    return this.http.post(this.apiUrl + '/favourites', body, settings);
  }
}
