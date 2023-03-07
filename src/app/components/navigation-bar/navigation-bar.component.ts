import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  isSeniorOfficer !: boolean;
  isCrimeOfficer !: boolean;
  isSysAdmin !: boolean;

  constructor(private authService: AuthService, private dialog: MatDialog, private _snackBar: MatSnackBar) {}

  // dialog for confirming logout request
  openDialog(): void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height: '130px',
      data: { message: 'Are you sure you want to log out?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // logout
        this.logout();
      }
    })
  }

  // show logout message
  showMessage(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success-snackbar', 'mat-simple-snackbar-action'],
    });
  }

  //log out
  logout(){
    this.authService.logoutService();
    this.showMessage('Successfully logged out.');
  }

  // initialize access variables
  initializeAccessVariables(accessLevels: string[]){
    this.isCrimeOfficer = accessLevels.includes('CrimeOfficer');
    this.isSeniorOfficer = accessLevels.includes('SeniorOfficer');
    this.isSysAdmin = accessLevels.includes('SystemAdmin');
  }

  ngOnInit(): void {
    this.authService.retrieveAccessLevels()
    .subscribe((res: any) => {
      const accessLevels = res.groups;
      this.initializeAccessVariables(accessLevels);
    })
  }

}
