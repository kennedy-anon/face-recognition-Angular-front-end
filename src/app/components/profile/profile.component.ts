import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user : any[] = [];
  displayedColumns: string[] = ['id', 'username', 'first_name', 'last_name', 'email']; // for displaying user detail

  constructor(private authService: AuthService) {}

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
