import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchImageService {
  apiUrl: string = 'http://localhost:8000/api/'

  constructor(private http: HttpClient) { }

  // search face
  searchFace(face: any){
    const token = localStorage.getItem('access');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    Object.entries(face).forEach(
      ([key, value]: any[]) => {
        formData.append(key, value);
      }
    )

    return this.http.post(`${this.apiUrl}recognize/`, formData, {headers: headers, observe: 'response'})
    .pipe(map(res => res));

  }
}
