import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Difficulty, Pagination, PaginationSorting, Recipe, UpdateResult} from '../../model/recipe';
import {HttpClient} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})


export class RecipeService {
  private url = 'http://127.0.0.1:8080/api/v1';
  private updateTimer = true;

  public readonly pagination = new BehaviorSubject<Pagination>({ascending: true, itemsPerPage: 10, page: 1, sort: PaginationSorting.Title});
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
      .post(`${this.url}/recipes/new`, recipe)
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

  addMultipleRecipes(recipes: [Recipe]): void {
    this.http
      .post(`${this.url}/recipes`, recipes)
      .subscribe(
        () => this.fetchAllRecipes(),
        (error) => this.notifyError('Could not add recipes', error)
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

  updatePagination(pagination: Pagination): void {
    this.pagination.next(pagination);
    this.sortAccordingToPagination(pagination);
  }

  sortAccordingToPagination(pagination: Pagination): void {
    const recipes = Object.assign([], this.recipes.getValue());
    console.log(recipes[0]);
    recipes.sort((r1, r2) => {
      switch (pagination.sort) {
        case PaginationSorting.Title:
          return pagination.ascending ? r1.title.localeCompare(r2.title) : r2.title.localeCompare(r1.title);
        case PaginationSorting.Created:
          return pagination.ascending ? compareDate(r1.created, r2.created) : compareDate(r2.created, r1.created);
        case PaginationSorting.LastModified:
          return pagination.ascending ? compareDate(r1.lastModified, r2.lastModified) : compareDate(r2.lastModified, r1.lastModified);
      }
    });
    console.log(recipes[0]);
    this.recipes.next(recipes);
  }

  public downloadImageBase64FromUrl(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, {responseType: 'blob'});
  }
}

function compareDate(date1: Date, date2: Date): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const same = d1.getTime() === d2.getTime();
  if (same) {
    return 0;
  }

  if (d1 > d2) {
    return 1;
  }

  if (d1 < d2) {
    return -1;
  }
}
