import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //login to receive access and refresh token
  loginService(credentials: any){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post('endpoint', credentials, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

}
