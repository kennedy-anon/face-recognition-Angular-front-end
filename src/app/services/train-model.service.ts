import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainModelService {
  apiUrl: string = 'http://localhost:8000/api/'

  constructor(private http: HttpClient) { }

  // service for training mode
  trainModel(faceImages: any) {
    const token = localStorage.getItem('access');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    for (let i = 0; i < faceImages.length; i++) {
      formData.append('images', faceImages[i], faceImages[i].name);
    }

    return this.http.post(`${this.apiUrl}train/`, formData, {headers: headers, observe: 'response'})
    .pipe(map(res => res));

  }
}
