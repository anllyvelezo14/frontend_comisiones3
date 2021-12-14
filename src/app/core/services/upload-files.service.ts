import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFilesService {
  private urlEndPoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    // formData is a data structure that can be used to store key-value pairs. We use it to build an object which corresponds to an HTML form with append() method.
    const formData: FormData = new FormData();

    formData.append('file', file);
    console.log('formData', formData);

    return this.http.post<any>(`${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.urlEndPoint}/files`);
  // }
}
