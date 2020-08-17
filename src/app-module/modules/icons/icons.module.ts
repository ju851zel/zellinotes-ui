import {NgModule} from '@angular/core';

import {BootstrapIconsModule} from 'ng-bootstrap-icons';
import {App, Bookmark, Plus} from 'ng-bootstrap-icons/icons';

const icons = {
  Plus,
  App,
  Bookmark
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
