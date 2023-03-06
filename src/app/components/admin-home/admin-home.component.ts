import { Component } from '@angular/core';
import { SearchFaceLogsService } from 'src/app/services/search-face-logs.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  displayedColumns: string[] = ['log_id', 'crime_officer_id', 'crime_officer_name', 'face_id', 'face_name', 'search_date']; // for displaying logs
  logsHistory : any;

  constructor(private faceSearchLogService: SearchFaceLogsService) {}

  //fetchLogs
  fetchLogs() {
    const access_token = localStorage.getItem('access');

    if (access_token) {
      this.faceSearchLogService.retrieveLogs(access_token, '')
      .subscribe(res => {
        this.logsHistory = res;
      })
    }
  }

  ngOnInit(): void {
    this.fetchLogs();
  }
}
