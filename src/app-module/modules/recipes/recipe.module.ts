import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeOverviewComponent} from './recipe-overview/recipe-overview-component/recipe-overview.component';
import {IconsModule} from '../icons/icons.module';
import { UploadRecipesModalComponent } from './upload-recipes-modal/upload-recipes-modal.component';
import { RecipeCardsComponent } from './recipe-overview/recipe-cards-component/recipe-cards.component';
import {NgxMasonryModule} from 'ngx-masonry';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SingleRecipeComponent } from './single-recipe/single-recipe-component/single-recipe.component';
import { RecipeUploadCropImageComponent } from './single-recipe/recipe-upload-crop-image/recipe-upload-crop-image.component';


@NgModule({
  declarations: [
    RecipeOverviewComponent,
    UploadRecipesModalComponent,
    RecipeCardsComponent,
    SingleRecipeComponent,
    RecipeUploadCropImageComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    NgxMasonryModule,
    BrowserAnimationsModule
  ]
})
export class RecipeModule {
}
