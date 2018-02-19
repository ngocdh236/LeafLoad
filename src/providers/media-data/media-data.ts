import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@environment';

/*
  Generated class for the MediaDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaDataProvider {
  apiUrl = ENV.API_URL;
  mediaURL = `${this.apiUrl}/uploads/``;

  constructor(public http: HttpClient) {
  }

/*  public getAllMedia() {
    return this.http.get(this.apiUrl + '/media?start=50&limit=50');
  }*/

  public getMediaFiles(page: number, numberOfFilesPerRequest: number) {
    const start = page * numberOfFilesPerRequest;
    return this.http.get(this.apiUrl + `/media?start=${start}&limit=${numberOfFilesPerRequest}`);
  }

}
