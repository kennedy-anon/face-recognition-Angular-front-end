import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //saving access and refresh tokens
  saveTokens(response: any){
    if (response.status == 200){
      localStorage.setItem('access', response.body.access);
      localStorage.setItem('refresh', response.body.refresh);
    }

  }

  //log out
  logoutService(){
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  //login to receive access and refresh token
  loginService(credentials: any){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:8000/api/token/', credentials, {headers: headers, observe: 'response'})
    .pipe(map(res => {
      this.saveTokens(res);
    }));
  }

}
