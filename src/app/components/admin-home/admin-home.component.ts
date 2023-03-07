import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SearchFaceLogsService } from 'src/app/services/search-face-logs.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  isSeniorOfficer !: boolean;
  isCrimeOfficer !: boolean;
  isSysAdmin !: boolean;

  displayedColumns: string[] = ['log_id', 'crime_officer_id', 'crime_officer_name', 'face_id', 'face_name', 'search_date']; // for displaying logs
  logsHistory : any;

  constructor(private faceSearchLogService: SearchFaceLogsService, private authService: AuthService) {}

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

      if (this.isSeniorOfficer) {
        this.fetchLogs(); // fetch logs only if its a SeniorOfficer
      }
    })
  }
}
