import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Difficulty, Recipe, UpdateResult} from '../../model/recipe';
import {HttpClient} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})


export class RecipeService {
  private url = 'http://127.0.0.1:8080/api/v1';
  private updateTimer = true;

  public readonly recipes = new BehaviorSubject<Array<Recipe>>([]);
  public readonly updateResult = new BehaviorSubject<UpdateResult>(UpdateResult.Success);

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

  // createTestRecipe(): Recipe {
  //   return new Recipe(
  //     '10',
  //     30,
  //     new Date(),
  //     new Date(),
  //     [],
  //     1,
  //     Difficulty.EASY,
  //     'test description',
  //     'test title',
  //     new Set(['vegan', 'fast', 'test']),
  //     null,
  //     ['1', '2', '3', '4', '5'],
  //     2);
  // }

  fetchAllRecipes(): void {
    this.http
      .get(`${this.url}/recipes`)
      .subscribe(
        (recipes: Array<Recipe>) => this.notifyUpdate(recipes.map(r => Recipe.from(r)), 'Fetching all recipes'),
        error => this.notifyError('Could not fetch all recipes', error)
      );
  }


  addRecipe(recipe: Recipe): void {
    this.http
      .post(`${this.url}/recipes`, recipe)
      .subscribe(
        (obj: { $oid: string }) => {
          recipe.id = obj.$oid;
          const recipes = this.recipes.getValue();
          recipes.push(recipe);
          this.notifyUpdate(recipes, 'Added new recipe');
        },
        (error) => this.notifyError('Could not add recipe', error)
      );
  }

  deleteRecipe(recipeId: string): void {
    this.http.delete(`${this.url}/recipes/${recipeId}`)
      .subscribe(
        _ => this.notifyUpdate(this.recipes.getValue().filter(rec => rec.id !== recipeId), 'Deleted recipe'),
        (error) => this.notifyError('Could not delete recipe', error)
      );
  }

  updateRecipeWithoutImage(recipe: Recipe): void {
    this.updateResult.next(UpdateResult.Waiting);
    if (this.updateTimer) {
      this.updateTimer = false;
      setTimeout(() => {
        this.updateTimer = true;
        const recipeToSend = recipe.clone();
        recipeToSend.image = null;
        // @ts-ignore
        recipeToSend.tags = [...new Set(recipeToSend.tags)];
        this.http
          .put(`${this.url}/recipes/${recipe.id}`, recipeToSend)
          .subscribe(
            _ => this.notifyUpdate(null, 'Update recipe'),
            error => this.notifyError('Could not update recipe', error)
          );
      }, 2000);
    }
  }

  updateRecipeImage(recipe: Recipe): void {
    this.updateResult.next(UpdateResult.Waiting);
    this.http
      .put(`${this.url}/recipes/${recipe.id}/image`, recipe.image)
      .subscribe(
        _ => this.notifyUpdate(null, 'Update recipe image'),
        (error) => this.notifyError('Could not update recipe image', error)
      );
  }

  deleteRecipeImage(recipeId: string): void {
    this.http
      .delete(`${this.url}/recipes/${recipeId}/image`)
      .subscribe(
        _ => this.notifyUpdate(null, 'Deleted recipe image'),
        (error) => this.notifyError('Could not delete recipe', error)
      );
  }

  duplicateRecipe(recipeId: string): void {
    const recipe = this.recipes.getValue().find(r => r.id === recipeId);
    this.addRecipe(recipe);
  }

  downloadRecipe(recipeId: string): void {
    const recipe = JSON.stringify(this.recipes.getValue().find(r => r.id === recipeId));
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(recipe));
    element.setAttribute('download', 'recipe.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  notifyUpdate(recipes: Array<Recipe> | null, msg: string): void {
    if (recipes) {
      this.recipes.next(recipes);
    }
    console.log('RecipeService: ' + msg);
    this.updateResult.next(UpdateResult.Success);
  }

  notifyError(msg: string, error: any): void {
    console.error('RecipeService: ' + msg, error);
    this.notifier.notify('error', msg);
    this.updateResult.next(UpdateResult.Error);
  }
}
