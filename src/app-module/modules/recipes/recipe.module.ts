import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeOverviewComponent} from './recipe-overview/recipe-overview-component/recipe-overview.component';
import {IconsModule} from '../icons/icons.module';
import {UploadRecipesModalComponent} from './upload-recipes-modal/upload-recipes-modal.component';
import {RecipeCardsComponent} from './recipe-overview/recipe-cards-component/recipe-cards.component';
import {NgxMasonryModule} from 'ngx-masonry';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SingleRecipeComponent} from './single-recipe/single-recipe-component/single-recipe.component';
import {RecipeUploadCropImageComponent} from './single-recipe/recipe-upload-crop-image-component/recipe-upload-crop-image.component';
import {RecipeTagsComponent} from './single-recipe/recipe-tags-component/recipe-tags.component';
import {InstructionsComponent} from './single-recipe/instructions-component/instructions.component';
import {IngredientsComponent} from './single-recipe/ingredients-somponent/ingredients.component';
import {SingleIngredientComponent} from './single-recipe/single-ingredient/single-ingredient.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    RecipeOverviewComponent,
    UploadRecipesModalComponent,
    RecipeCardsComponent,
    SingleRecipeComponent,
    RecipeUploadCropImageComponent,
    RecipeTagsComponent,
    InstructionsComponent,
    IngredientsComponent,
    SingleIngredientComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    NgxMasonryModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
  ]
})
export class RecipeModule {
}
