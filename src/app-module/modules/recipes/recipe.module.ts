import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeOverviewComponent} from './recipe-overview/recipe-overview-component/recipe-overview.component';
import {IconsModule} from '../icons/icons.module';
import {UploadRecipesModalComponent} from './upload-recipes-modal/upload-recipes-modal.component';
import {RecipeCardsComponent} from './recipe-overview/recipe-cards-component/recipe-cards.component';
import {NgxMasonryModule} from 'ngx-masonry';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SingleRecipeComponent} from './single-recipe/single-recipe.component';
import {ImageComponent} from './single-recipe/image/image.component';
import {TagsComponent} from './single-recipe/tags/tags.component';
import {InstructionsComponent} from './single-recipe/instructions/instructions.component';
import {IngredientsComponent} from './single-recipe/ingredients/ingredients.component';
import {SingleIngredientComponent} from './single-recipe/ingredients/single-ingredient/single-ingredient.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TopButtonsComponent} from './single-recipe/top-buttons/top-buttons.component';
import {BasicPropertiesComponent} from './single-recipe/basic-properties/basic-properties.component';
import {DndModule} from 'ngx-drag-drop';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    RecipeOverviewComponent,
    UploadRecipesModalComponent,
    RecipeCardsComponent,
    SingleRecipeComponent,
    ImageComponent,
    TagsComponent,
    InstructionsComponent,
    IngredientsComponent,
    SingleIngredientComponent,
    TopButtonsComponent,
    BasicPropertiesComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
    NgxMasonryModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    DndModule,
    ImageCropperModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecipeModule {
}
