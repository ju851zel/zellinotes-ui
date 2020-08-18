import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Recipe} from '../../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private internalRecipes: Array<Recipe> = [];
  public recipes = new BehaviorSubject<Array<Recipe>>(this.internalRecipes);

  constructor() {}

  addRecipe(recipe: Recipe): void {
    this.internalRecipes.push(recipe);
    this.recipes.next(this.internalRecipes);
  }

  deleteRecipe(recipeId: string): void {
    this.internalRecipes = this.internalRecipes.filter(recipe => recipe.id !== recipeId);
    this.recipes.next(this.internalRecipes);
  }
}
