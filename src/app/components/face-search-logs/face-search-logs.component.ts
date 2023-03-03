import { Component } from '@angular/core';
import { SearchFaceLogsService } from 'src/app/services/search-face-logs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-face-search-logs',
  templateUrl: './face-search-logs.component.html',
  styleUrls: ['./face-search-logs.component.css']
})
export class FaceSearchLogsComponent {
  logsHistory : any;
  displayedColumns: string[] = ['crime_officer_id', 'crime_officer_name', 'face_id', 'face_name', 'search_date']; // for displaying logs

  constructor(private faceSearchLogService: SearchFaceLogsService, private _snackBar: MatSnackBar) {}

  // show error message using snackbar
  showMessage(message: string){
    this._snackBar.open(message, 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar', 'mat-simple-snackbar-action'],
    });
  }

  ngOnInit(): void {
    const access_token = localStorage.getItem('access');

    // fetching the logs
    if (access_token){
      this.faceSearchLogService.retrieveLogs(access_token)
      .subscribe({
        next: (res => {
          this.logsHistory =res;
        }),
        error: (err => {
          this.showMessage(err.error.detail);
        })
      })
    }
  }
}
