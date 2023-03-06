import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchFaceComponent } from './components/search-face/search-face.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { TrainModelComponent } from './components/train-model/train-model.component';
import { FaceSearchLogsComponent } from './components/face-search-logs/face-search-logs.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    SearchFaceComponent,
    NavigationBarComponent,
    TopBarComponent,
    TrainModelComponent,
    FaceSearchLogsComponent,
    ConfirmationDialogComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
