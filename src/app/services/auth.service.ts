import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://localhost:8000/api/'

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

  // verify access token
  verifyAccessToken(access_token: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    const token = {
      "token": access_token
    }

    return this.http.post(`${this.apiUrl}token/verify/`, token, {headers: headers, observe: 'response'});
  }

  // refreshing token
  refreshToken(refresh_token: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    const refresh = {
      "refresh": refresh_token
    }

    return this.http.post(`${this.apiUrl}token/refresh/`, refresh, {headers: headers, observe: 'response'});
  }


  //check if the user is logged in
  isLoggedIn(): Observable<boolean> {
    const access_token = localStorage.getItem('access');
    const refresh_token = localStorage.getItem('refresh');

    if (access_token) {
        // Check if the token is valid
        return this.verifyAccessToken(access_token).pipe(
            map((res: HttpResponse<any>) => {
                // Token is valid, return true
                return true;
            }),
            catchError((err: any) => {
                // Token is not valid, try refreshing the token
                if (refresh_token && err.error.code === 'token_not_valid') {
                    return this.refreshToken(refresh_token).pipe(
                        map((res: HttpResponse<any>) => {
                            // Token was successfully refreshed, save the new token
                            const new_access_token = res.body.access;
                            localStorage.setItem('access', new_access_token);

                            // Token is valid, return true
                            return true;
                        }),
                        catchError((err: any) => {
                            // Token could not be refreshed, return false
                            return of(false);
                        })
                    );
                } else {
                    // Token is not valid and cannot be refreshed, return false
                    return of(false);
                }
            })
        );
    } else {
        // No access token, return false
        return of(false);
    }
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
    return this.http.post(`${this.apiUrl}token/`, credentials, {headers: headers, observe: 'response'})
    .pipe(
      catchError(this.handleError),
      map(res => {
      return this.saveTokens(res);
    }));
  }

}
