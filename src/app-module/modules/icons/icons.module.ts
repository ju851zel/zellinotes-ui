import {NgModule} from '@angular/core';

import {BootstrapIconsModule} from 'ng-bootstrap-icons';
import {
  App,
  ArrowLeft,
  ArrowUp,
  Bookmark,
  CloudDownload,
  CloudUpload,
  Download,
  EggFried,
  Lock,
  Plus,
  Trash,
  Unlock,
  Files,
} from 'ng-bootstrap-icons/icons';

const icons = {
  Plus,
  CloudDownload,
  CloudUpload,
  ArrowUp,
  App,
  Bookmark,
  Download,
  Unlock,
  Trash,
  Lock,
  Files,
  ArrowLeft,
  EggFried
};

@NgModule({
  imports: [
    BootstrapIconsModule.pick(icons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class IconsModule {
}


