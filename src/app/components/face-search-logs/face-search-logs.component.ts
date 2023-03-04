import { Component } from '@angular/core';
import { SearchFaceLogsService } from 'src/app/services/search-face-logs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-face-search-logs',
  templateUrl: './face-search-logs.component.html',
  styleUrls: ['./face-search-logs.component.css']
})
export class FaceSearchLogsComponent {
  currentPage !: number;
  totalPages !: number;
  logsHistory : any;
  nextUrl: string | null = null;
  previousUrl: string | null = null;
  displayedColumns: string[] = ['log_id', 'crime_officer_id', 'crime_officer_name', 'face_id', 'face_name', 'search_date']; // for displaying logs

  constructor(private faceSearchLogService: SearchFaceLogsService, private _snackBar: MatSnackBar) {}

  goToNextPage() {
    if (this.nextUrl) {
      // make a request for the next page of logs
      this.fetchLogs(this.nextUrl);
      this.currentPage += 1;
    }
  }

  goToPreviousPage() {
    if (this.previousUrl) {
      // fetch the previous logs page
      this.fetchLogs(this.previousUrl);
      this.currentPage -= 1;
    }
  }

  // assign variables
  initializeVariables(res: any) {
    this.logsHistory = res.results;
    this.nextUrl = res.next;
    this.previousUrl = res.previous;
    this.totalPages = Math.ceil(res.count / 10)
  }

  // handling errors
  handleErrors(err: any) {
    if (err.error.code === 'token_not_valid'){
      this.showMessage('Your session has expired. Please refresh or log in again to continue.');
    } else {
      this.showMessage(err.error.detail);
    }
  }

  // fetching logs
  fetchLogs(url: string) {
    const access_token = localStorage.getItem('access');

    // fetching the logs
    if (access_token){
      this.faceSearchLogService.retrieveLogs(access_token, url)
      .subscribe({
        next: (res => {
          this.initializeVariables(res);
        }),
        error: (err => {
          this.handleErrors(err);
        })
      })
    }
  }

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
    // fetch logs for first page
    this.fetchLogs('');
    this.currentPage = 1;
  }
}
