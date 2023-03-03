import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchFaceLogsService {
  apiUrl: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  // retrieving logs
  retrieveLogs(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(`${this.apiUrl}logs/`, { headers })
    .pipe(map(res => res));
  }
}
