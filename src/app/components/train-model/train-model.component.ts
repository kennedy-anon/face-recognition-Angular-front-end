import { Component } from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-train-model',
  templateUrl: './train-model.component.html',
  styleUrls: ['./train-model.component.css']
})
export class TrainModelComponent {
  selectedImages !: ImageSnippet[];
  faceImages !: FileList;


    // for processing selected training face images
    onFileSelected(event: any) {
      this.selectedImages = [];
      this.faceImages = event.target.files
      
      if (this.faceImages){
        for (let i=0; i < 3; i++){
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
}
