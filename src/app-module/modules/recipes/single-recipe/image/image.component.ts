import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {RecipeService} from '../../../../services/recipe-service/recipe.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnChanges {

  constructor(private helper: RecipeService) {
  }

  @Input() editMode: boolean;
  @Input() defaultImageAsBase64: string;

  cropper = {
    originalSelectedEvent: undefined,
    imageAsBase64: undefined,
    croppedResult: undefined,
    visible: this.editMode,
  };
  image: string = undefined;


  @Output()
  imageChanged = new EventEmitter<string>();

  onImageSelect(event: any): void {
    this.cropper.originalSelectedEvent = event;
    this.cropper.visible = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultImageAsBase64) {
      this.image = changes.defaultImageAsBase64.currentValue;
    }
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.cropper.croppedResult = event.base64;
  }

  loadImageFailed(): void {
    console.log('loadimage failed');
  }

  openFileSelectingDialog(fileInput: any): void {
    fileInput.click();
  }

  saveFile(): void {
    this.image = this.cropper.croppedResult;
    this.cropper.visible = false;
    this.imageChanged.emit(this.image);
  }

  editFile(): void {
    if (this.cropper.originalSelectedEvent) {
      this.cropper.imageAsBase64 = undefined;
    } else {

      if (isImageUrl(this.image)) {
        this.downloadAndSaveImage();
      } else {
        this.cropper.imageAsBase64 = this.image;
      }

    }
    this.cropper.croppedResult = undefined;
    this.cropper.visible = true;
  }

  private downloadAndSaveImage(): void {
    this.helper.downloadImageBase64FromUrl(this.image).subscribe(
      blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          this.image = reader.result as string;
          this.cropper.imageAsBase64 = this.image;
          this.imageChanged.emit(this.image);
        };
      }
    );
  }

  removeImage(): void {
    this.image = null;
    this.imageChanged.emit(this.image);
  }
}

function isImageUrl(image: string): boolean {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(image);
}
