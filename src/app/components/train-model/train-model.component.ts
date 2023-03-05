import { Component } from '@angular/core';
import { TrainModelService } from 'src/app/services/train-model.service';
import { MatSnackBar } from '@angular/material/snack-bar';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-train-model',
  templateUrl: './train-model.component.html',
  styleUrls: ['./train-model.component.css']
})
export class TrainModelComponent {
  selectedImages : ImageSnippet[] = [];
  faceImages !: FileList;

  constructor(private trainModelService: TrainModelService, private _snackBar: MatSnackBar) {}

  // show error message using snack bar
  showMessage(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar', 'mat-simple-snackbar-action'],
    });
  }

    // for processing selected training face images
    onFileSelected(event: any) {
      this.selectedImages = [];
      this.faceImages = event.target.files
      
      if (this.faceImages){
        for (let i=0; i < 5; i++){
          const reader = new FileReader();

          reader.onload = (event: any) => {
            const imageSrc = event.target.result;
            const selectedImage = new ImageSnippet(imageSrc, this.faceImages[i]);
            this.selectedImages.push(selectedImage);
          };

          reader.readAsDataURL(this.faceImages[i])
        }
      }

    }

    // train model
    trainModel() {
      if (this.faceImages) {
        this.trainModelService.trainModel(this.faceImages)
        .subscribe({
          next: (res => {
            console.log(res);
          }),
          error: (err => {
            console.log(err);
          })
        });
      } else {
        // show error message
        this.showMessage('Kindly select face images first.');
      }
      
    }

}
