import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { LoginComponent } from './components/login/login.component';
import { SearchFaceComponent } from './components/search-face/search-face.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin-home', component: AdminHomeComponent},
  {path: 'search-face', component: SearchFaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
