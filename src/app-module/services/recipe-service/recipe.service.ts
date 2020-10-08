import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Difficulty, Recipe} from '../../model/recipe';
import {HttpClient} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})


export class RecipeService {
  private url = 'http://127.0.0.1:8080/api/v1';
  private internalRecipes: Array<Recipe> = [];
  public readonly recipes = new BehaviorSubject<Array<Recipe>>(this.internalRecipes);

  constructor(private http: HttpClient,
              private notifier: NotifierService) {
  }

  addDefaultRecipe(): void {
    const recipe = new Recipe(
      '',
      30,
      new Date(),
      new Date(),
      [],
      1,
      Difficulty.EASY,
      '',
      'New Recipe',
      [],
      null,
      [],
      2);
    this.addRecipe(recipe);
  }

  createTestRecipe(): Recipe {
    return new Recipe(
      '10',
      30,
      new Date(),
      new Date(),
      [],
      1,
      Difficulty.EASY,
      'test description',
      'test title',
      new Set(['vegan', 'fast', 'test']),
      null,
      ['1', '2', '3', '4', '5'],
      2);
  }

  fetchAllRecipes(): void {
    this.http.get(`${this.url}/recipes`)
      .subscribe((recipes: Array<Recipe>) => {
          console.log('RecipeService: Fetching all recipes');
          recipes = recipes.map(recipe => Recipe.from(recipe));
          this.internalRecipes = recipes;
          this.update();
        },
        error => {
          this.notifyError('Could not fetch all recipes', error);
        }
      );
  }

  notifyError(msg: string, error: any): void {
    console.error('RecipeService: ' + msg, error);
    this.notifier.notify('error', msg);
  }

  addRecipe(recipe: Recipe): void {
    this.http.post(`${this.url}/recipes`, recipe)
      .subscribe((obj: { $oid: string }) => {
          console.log('RecipeService: Added new recipe');
          recipe.id = obj.$oid;
          this.internalRecipes.push(recipe);
          this.update();
        }, (error) => {
          this.notifyError('Could not add recipe', error);
        }
      );
  }

  deleteRecipe(recipeId: string): void {
    this.http.delete(`${this.url}/recipes/${recipeId}`)
      .subscribe(_ => {
          console.log('RecipeService: Deleted recipe');
          this.internalRecipes = this.internalRecipes.filter(rec => rec.id !== recipeId);
          this.update();
        }, (error) => {
          this.notifyError('Could not delete recipe', error);
        }
      );
  }

  updateRecipeWithoutImage(recipe: Recipe): void{
    const recipeToSend = recipe.clone();
    recipeToSend.image = null;
    this.http.put(`${this.url}/recipes/${recipe.id}`, recipeToSend)
      .subscribe(
        _ => console.log('RecipeService: Update recipe'),
        error => {
          this.notifyError('Could not update recipe', error)
        });
  }

  updateRecipeImage(recipe: Recipe): void {
    this.http.put(`${this.url}/recipes/${recipe.id}/image`, recipe.image)
      .subscribe(_ => console.log('RecipeService: Update recipe image'),
        (error) => this.notifyError('Could not update recipe image', error));
  }

  deleteRecipeImage(recipeId: string): void {
    this.http.delete(`${this.url}/recipes/${recipeId}/image`)
      .subscribe(_ => console.log('RecipeService: Deleted recipe image'),
        (error) => this.notifyError('Could not delete recipe', error));
  }

  duplicateRecipe(recipeId: string): void {
    const recipe = this.internalRecipes.find(r => r.id === recipeId);
    this.addRecipe(recipe);
  }

  downloadRecipe(recipeId: string): void {
    const recipe = JSON.stringify(this.internalRecipes.find(r => r.id === recipeId));
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(recipe));
    element.setAttribute('download', 'recipe.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  update(): void {
    this.recipes.next(this.internalRecipes);
  }
}
