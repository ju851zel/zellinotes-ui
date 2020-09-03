import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Recipe} from '../../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private internalRecipes: Array<Recipe> = [];
  public readonly recipes = new BehaviorSubject<Array<Recipe>>(this.internalRecipes);

  constructor() {
  }

  addRecipe(recipe: Recipe): void {
    this.internalRecipes.push(recipe);
    this.recipes.next(this.internalRecipes);
  }

  deleteRecipe(recipeId: string): void {
    this.internalRecipes = this.internalRecipes.filter(recipe => recipe.id !== recipeId);
    this.update();
  }

  replaceRecipe(recipeId: string, recipe: Recipe): void {
    console.log('Updated recipe: ', recipe);
    this.internalRecipes = this.internalRecipes.filter(rec => rec.id !== recipeId);
    this.internalRecipes.push(recipe);
    this.update();
  }

  update(): void {
    this.recipes.next(this.internalRecipes);
  }
}
