import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { FaceSearchLogsComponent } from './components/face-search-logs/face-search-logs.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchFaceComponent } from './components/search-face/search-face.component';
import { TrainModelComponent } from './components/train-model/train-model.component';
import { AccessLevelGuard } from './guards/access-level.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: AdminHomeComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'access-denied', component: AccessDeniedComponent},
  {path: 'admin-home', component: AdminHomeComponent, canActivate:[AuthGuard]},
  {path: 'search-face', component: SearchFaceComponent, canActivate:[AuthGuard]},
  {path: 'train-model', component: TrainModelComponent, canActivate:[AuthGuard]},
  {path: 'logs', component: FaceSearchLogsComponent, canActivate:[AuthGuard, AccessLevelGuard], data: {accessLevels: ['SeniorOfficer']}},
  {path: 'account', component: ProfileComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
