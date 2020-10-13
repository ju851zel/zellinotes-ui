import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../model/recipe';

@Component({
  selector: 'app-upload-recipes-modal',
  templateUrl: './upload-recipes-modal.component.html',
  styleUrls: ['./upload-recipes-modal.component.css']
})
export class UploadRecipesModalComponent implements OnInit {

  public uploadRecipeString: string = null;

  constructor() {
  }

  @Output()
  singleRecipeUploading = new EventEmitter<Recipe>();
  @Output()
  multipleRecipeUploading = new EventEmitter<[Recipe]>();

  ngOnInit(): void {
  }

  textIsValidRecipe(): boolean {
    if (this.uploadRecipeString) {
      try {
        const recipes = JSON.parse(this.uploadRecipeString);
        if (Array.isArray(recipes) && recipes.filter(r => Recipe.try_from(r) === null).length === 0) {
          return true;
        } else if (Recipe.try_from(recipes) !== null) {
          return true;
        }
      } catch (e) {
      }
    }
    return false;
  }

  uploadRecipe(): void {
    if (this.uploadRecipeString) {
      const recipes = JSON.parse(this.uploadRecipeString);
      if (Array.isArray(recipes) && recipes.filter(r => Recipe.try_from(r) === null).length === 0) {
        // @ts-ignore
        this.multipleRecipeUploading.emit(recipes);
      } else if (Recipe.try_from(recipes) !== null) {
        this.singleRecipeUploading.emit(recipes);
      }
    }
  }

}
