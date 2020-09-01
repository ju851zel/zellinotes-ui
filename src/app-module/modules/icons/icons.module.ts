import {NgModule} from '@angular/core';

import {BootstrapIconsModule} from 'ng-bootstrap-icons';
import {
  allIcons,
  App,
  ArrowLeftCircle,
  ArrowsMove,
  ArrowUp,
  Bookmark,
  Bullseye, ChevronDown,
  ChevronUp,
  CloudDownload,
  CloudUpload,
  Download,
  EggFried,
  Files,
  Lock,
  People,
  Plus,
  PlusCircle,
  Trash,
  Unlock
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
  Bullseye,
  ArrowLeftCircle,
  People,
  ArrowsMove,
  EggFried,
  ChevronUp,
  ChevronDown,
  PlusCircle
};

// todo change to icosn and add only the ones desired
@NgModule({
  imports: [
    BootstrapIconsModule.pick(allIcons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class IconsModule {
}


