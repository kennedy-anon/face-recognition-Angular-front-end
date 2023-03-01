import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  userDetail : any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const access_token = localStorage.getItem('access');

    //retrieving user details
    if (access_token) {
      this.authService.getUserFromToken(access_token)
      .subscribe(res=>{
        this.userDetail = res;
      })
    }

  }

}
