import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username !: string;
  password !: string;

  constructor(private authService: AuthService) {}

  login(){
    const credentials = {
      username: this.username,
      password: this.password
    }

    this.authService.loginService(credentials)
    .subscribe(res => {
      console.log(res)
    })
  }

  ngOnInit(): void {
    //this.login();
  }

}
