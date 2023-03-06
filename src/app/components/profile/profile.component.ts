import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  old_password !: string;
  new_password !: string;
  confirm_new_password !: string;
  user : any[] = [];
  displayedColumns: string[] = ['id', 'username', 'first_name', 'last_name', 'email']; // for displaying user detail

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {}

  // show message using mat-snackbar
  showMessage(message: string, snackbar_class: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 6000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [snackbar_class, 'mat-simple-snackbar-action'],
    });
  }

  // handle success response
  handleSuccessResponse(res: any) {
    this.old_password = '';
    this.new_password = '';
    this.confirm_new_password = '';
    this.showMessage(res.body.detail, 'success-snackbar');
  }

  //handle errors
  handleErrorResponse(err: any) {
    let errorMessage = ''

    if (err.error.non_field_errors){
      errorMessage = err.error.non_field_errors;
    } else if (err.error.old_password){
      errorMessage = err.error.old_password;
    }else if (err.error.new_password){
      errorMessage = err.error.new_password.join('\n');
    }

    this.showMessage(errorMessage, 'error-snackbar'); // show error message
  }

  // change password
  changePassword() {
    const passwords = {
      old_password: this.old_password,
      new_password: this.new_password,
      confirm_new_password: this.confirm_new_password
    }

    const access_token = localStorage.getItem('access');

    if (access_token) {
      this.authService.changePassword(passwords, access_token)
      .subscribe({
        next: (res => {
          this.handleSuccessResponse(res); // success
        }),
        error: (err => {
          this.handleErrorResponse(err); // error
        })
      })
    }

  }

  ngOnInit(): void {
    // getting user details
    if (this.authService.getUser() != undefined){
      // user details available
      this.user.push(this.authService.getUser());
    } else {
      // make a request
      const access_token = localStorage.getItem('access');

      if (access_token) {
        this.authService.getUserFromToken(access_token)
        .subscribe(res=>{
          this.user.push(res);
        })
      }
    }
  }

}
