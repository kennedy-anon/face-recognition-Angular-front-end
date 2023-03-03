import { Component } from '@angular/core';
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

  constructor(private searchFaceService: SearchImageService) {}

  // for processing face image
  onFileSelected(event: any) {
    this.faceDetail = undefined;
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any)=>{
      this.selectedImage = new ImageSnippet(event.target.result, file);
      this.faceImage = this.selectedImage.file;
    })

    reader.readAsDataURL(file);

  }

  // search face
  searchFace(){
    const face = {
      'image': this.faceImage
    }

    this.searchFaceService.searchFace(face)
    .subscribe(res => {
      this.faceDetail = res.body;
    })

  }

}
