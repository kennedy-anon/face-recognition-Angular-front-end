import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  login(){
    const credentials = {
      username: '',
      password: ''
    }

    this.authService.loginService(credentials)
    .subscribe(res => {
      console.log(res)
    })
  }


}
