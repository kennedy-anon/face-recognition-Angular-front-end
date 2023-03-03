import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchImageService } from 'src/app/services/search-image.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-search-face',
  templateUrl: './search-face.component.html',
  styleUrls: ['./search-face.component.css']
})
export class SearchFaceComponent {
  selectedImage !: ImageSnippet;
  faceImage !: File;
  faceDetail : any;
  loading : boolean = false; // for showing and hiding mat-spinner
  fileSelected: boolean = false; // checking if there is a file selected
  displayedColumns: string[] = ['face_no', 'face_name', 'face_id']; // for displaying face detail
 
  constructor(private searchFaceService: SearchImageService, private _snackBar: MatSnackBar) {}

  // for processing face image
  onFileSelected(event: any) {
    this.faceDetail = undefined;  // clear page
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any)=>{
      this.selectedImage = new ImageSnippet(event.target.result, file);
      this.faceImage = this.selectedImage.file;
    })

    reader.readAsDataURL(file);
    this.fileSelected = true; // a file is available
  }

  // show error message using snack bar
  showMessage(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar', 'mat-simple-snackbar-action'],
    });
  }

  // search face
  searchFace(){
    if (this.fileSelected){
      // a file is available
      const face = {
        'image': this.faceImage
      }
  
      this.loading =true; // show mat-spinner
      this.searchFaceService.searchFace(face)
      .subscribe({
        next: (res => {
          this.faceDetail = res.body;
          this.loading = false; // hide mat-spinner
        }),
        error: (err => {
          this.showMessage(err.error.detail);
          this.loading = false; // hide mat-spinner
        })
      });

    } else {
      // no file selected
      this.showMessage('Choose a face image first.');
    }

  }

}
