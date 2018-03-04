import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  commentURL = `${this.apiUrl}/comments`;
  favoriteURL = `${this.apiUrl}/favourites`;
  mediaForUserURL = `${this.apiUrl}/media/user`;

  constructor(public http: HttpClient) {
  }

  public getMediaFiles(page: number, numberOfFilesPerRequest: number) {
    const start = page * numberOfFilesPerRequest;
    return this.http.get(this.apiUrl + `/media?start=${start}&limit=${numberOfFilesPerRequest}`);
  }

  public getMediaFilesOfCurrentUser(page: number, numberOfFilesPerRequest: number) {
    const start = page * numberOfFilesPerRequest;
    return this.http.get(this.apiUrl + '/media/user');
  }

  public getMediaFilesForUser(userId: number) {
    const userMediaUrl = `${this.mediaForUserURL}/${userId}`;
    return this.http.get(userMediaUrl);
  }

  public searchMediaFiles(keyWord: string) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')).set('Conten-Type', 'application/x-www-form-urlencoded')
    }
    const dictValue = {title: `${keyWord}`, description: `${keyWord}`};
    return this.http.post(this.searchURL, dictValue);
  }

  public getCommentsForFile(fileId: number) {
    const commentsForFileURL = `${this.commentURL}/file/${fileId}`;
    return this.http.get(commentsForFileURL);
  }

  public createCommentToMediaFile(comment: string, mediaFile: any) {
    const data = {comment: comment, file_id: mediaFile.file_id};
    return this.http.post(this.commentURL, data);
  }

  public getLikesForMediaFile(fileId: number) {
    const favoritesToFilesURL = `${this.favoriteURL}/file/${fileId}`;
    return this.http.get(favoritesToFilesURL);
  }

  public likeMediaFile(fileId: number) {
    const data = {file_id: fileId};
    return this.http.post(this.favoriteURL, data);
  }

  public unlikeMediaFile(fileId: number) {
    const favoritesToFilesURL = `${this.favoriteURL}/file/${fileId}`;
    return this.http.delete(favoritesToFilesURL);
  }

  public uploadMedia(formData: FormData) {
    return this.http.post(this.apiUrl + '/media', formData);
  }

  public deleteMediaFile(file: any) {
    if (file.file_id) {
      return this.deleteMediaFileById(file.file_id);
    }
  }

  public deleteMediaFileById(fileId: number) {
    let url = `${this.apiUrl}/media/${fileId}`;
    return this.http.delete(url);
  }
}
