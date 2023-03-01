import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { FaceSearchLogsComponent } from './components/face-search-logs/face-search-logs.component';
import { LoginComponent } from './components/login/login.component';
import { SearchFaceComponent } from './components/search-face/search-face.component';
import { TrainModelComponent } from './components/train-model/train-model.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin-home', component: AdminHomeComponent, canActivate:[AuthGuard]},
  {path: 'search-face', component: SearchFaceComponent, canActivate:[AuthGuard]},
  {path: 'train-model', component: TrainModelComponent, canActivate:[AuthGuard]},
  {path: 'logs', component: FaceSearchLogsComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
