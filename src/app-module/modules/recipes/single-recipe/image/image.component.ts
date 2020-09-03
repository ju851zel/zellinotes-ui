import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnChanges {

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

  loadImageFailed() {
    // show message
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
    console.log(this.image);
    if (this.cropper.originalSelectedEvent) {
      this.cropper.imageAsBase64 = undefined;
    } else {
      this.cropper.imageAsBase64 = this.image;
    }
    this.cropper.croppedResult = undefined;
    this.cropper.visible = true;
  }

  removeImage(): void {
    this.image = null;
    this.imageChanged.emit(this.image);
  }
}

