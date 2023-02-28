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

  // saving refreshed access token
  private saveRefreshedToken(response: any){
    localStorage.setItem('access', response.body.access);
  }

  //log out
  logoutService(){
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  //check if the user is logged in
  isLoggedIn(): Promise<boolean>{
    const access_token = localStorage.getItem('access');
    const refresh_token = localStorage.getItem('refresh');
    let returnValue:boolean = false;

    if (access_token){
      // verify token
      this.verifyAccessToken(access_token).subscribe({
        next: (res => {
          // valid token
          console.log(res);
          returnValue = true;
          console.log(returnValue + " hello world");
          //return true;
        }),
        error: (err =>{
          // try refreshing token
          if (refresh_token && err.error.code === 'token_not_valid'){
            this.refreshToken(refresh_token).subscribe({
              next: (res =>{
                //save refreshed token
                this.saveRefreshedToken(res);
                returnValue = true;
                //return true;
              }),
              error: (err =>{
                // token can't be refreshed
                returnValue = false;
                //return false;
              })
            });
          }else{
            returnValue = false;
            //return false;
          }

          //return false;
        })
      });

      //return false;
    }else{
      returnValue = false;
      //return false;
    }

    return returnValue;
  }

  //refresh token
  refreshToken(refresh: string){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    const refresh_token = {
      "refresh": refresh
    }

    return this.http.post('http://localhost:8000/api/token/refresh/', refresh_token, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  //verifying access token
  verifyAccessToken(token: string) {
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    const access_token = {
      "token": token
    }

    return this.http.post('http://localhost:8000/api/token/verify/', access_token, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
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
