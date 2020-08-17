import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeOverviewComponent} from './recipe-overview-component/recipe-overview.component';
import {IconsModule} from '../icons/icons.module';


@NgModule({
  declarations: [
    RecipeOverviewComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class RecipeModule {
}
