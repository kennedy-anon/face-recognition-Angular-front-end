import { Component } from '@angular/core';

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

  // for processing face image
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any)=>{
      this.selectedImage = new ImageSnippet(event.target.result, file);
      this.faceImage = this.selectedImage.file;
    })

    reader.readAsDataURL(file);

  }

}
