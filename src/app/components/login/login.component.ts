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
  resMessage !: string;
  resMessageColor : string = 'red';

  constructor(private authService: AuthService) {}

  login(){
    const credentials = {
      username: this.username,
      password: this.password
    }

    this.authService.loginService(credentials)
    .subscribe({
      next: (res =>{
        this.resMessageColor = 'green';
        this.resMessage = res;
      }),
      error: (err =>{
        this.resMessage = err;
      })
    })
  }

  ngOnInit(): void {
  }

}
