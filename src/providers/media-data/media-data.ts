import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@environment';

@Injectable()
export class MediaDataProvider {
  apiUrl = ENV.API_BASE_URL;
  mediaURL = `${this.apiUrl}/uploads/`;
  searchURL = `${this.apiUrl}/media/search/`;
  commentURL = `${this.apiUrl}/comments`;
  favoriteURL = `${this.apiUrl}/favourites`;
  mediaForUserURL = `${this.apiUrl}/media/user`;
  uploadURL = `${this.apiUrl}/media`;

  constructor(public http: HttpClient) {
  }

  public getMediaFiles(page: number, numberOfFilesPerRequest: number) {
    const start = page * numberOfFilesPerRequest;
    return this.http.get(this.apiUrl + `/media?start=${start}&limit=${numberOfFilesPerRequest}`);
  }

  public getMediaFilesOfCurrentUser() {
    // const start = page * numberOfFilesPerRequest;
    return this.http.get(this.apiUrl + '/media/user');
  }

  public getMediaFilesForUser(userId: number) {
    const userMediaUrl = `${this.mediaForUserURL}/${userId}`;
    return this.http.get(userMediaUrl);
  }

  public searchMediaFiles(keyWord: string) {
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
    return this.http.post(this.uploadURL, formData);
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

  public updateFileInfo(fileId: number, media: any) {
    let url = `${this.apiUrl}/media/${fileId}`;
    return this.http.put(url, media);
  }
}
