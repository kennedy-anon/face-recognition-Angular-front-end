import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  // dialog for confirming logout request
  openDialog(): void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to log out?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // logout
        this.logout();
      }
    })
  }


  //log out
  logout(){
    this.authService.logoutService();
  }

}
