import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //saving access and refresh tokens
  private saveTokens(response: any){
    if (response.status == 200){
      localStorage.setItem('access', response.body.access);
      localStorage.setItem('refresh', response.body.refresh);
    }
    return "Login successful."
  }

  //log out
  logoutService(){
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  //handling login errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // server-side error
      let status: number = error.status;
      switch (status) {
        case 0:
          errorMessage = 'Server down! Contact SysAdmin.';
          //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          break;
        case 401:
          errorMessage = 'Incorrect username or password.';
          break;
      }

    }
    // return an observable with a user-facing error message
    return throwError(errorMessage);
  }

  //login to receive access and refresh token
  loginService(credentials: any){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:8000/api/token/', credentials, {headers: headers, observe: 'response'})
    .pipe(
      catchError(this.handleError),
      map(res => {
      return this.saveTokens(res);
    }));
  }

}
