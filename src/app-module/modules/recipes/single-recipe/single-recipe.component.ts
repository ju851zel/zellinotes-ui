import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Difficulty, Ingredient, Recipe} from '../../../model/recipe';
import {RecipeService} from '../../../services/recipe-service/recipe.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public editMode = true;
  public loadingRecipe = true;

  private recipeSubscriber: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  createTestRecipe(): void {
    const recipe = new Recipe(
      this.recipeService.recipes.getValue().length.toString(),
      30,
      new Date(),
      new Date(),
      [],
      1,
      Difficulty.EASY,
      'test description',
      'test title',
      new Set(['vegan', 'fast', 'test']),
      'https://img.taste.com.au/-RGbsS2h/taste/2019/05/chocolate-and-nutella-smores-cake-149475-2.jpg',
      [],
      2);
    this.recipeService.addRecipe(recipe);
  }

  ngOnInit(): void {
    this.createTestRecipe();
    const recipeId = this.getRecipeIdFromURL();
    this.recipeSubscriber = this.recipeService.recipes.subscribe(recipes => {
      const foundRecipe = recipes.find(recipe => recipe.id === recipeId);
      if (foundRecipe) {
        this.loadingRecipe = false;
        this.recipe = foundRecipe.clone();
      } else {
        this.navigateToRecipes();
      }
    });
  }

  ngOnDestroy(): void {
    this.recipeSubscriber.unsubscribe();
  }

  private getRecipeIdFromURL(): string {
    return this.activatedRoute.snapshot.params.recipeId;
  }

  navigateToRecipes(): void {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  toggleEditable(): void {
    this.editMode = !this.editMode;
  }

  deleteRecipe(): void {
    console.log('todo');
  }

  downloadRecipe(): void {
    console.log('todo');
  }

  duplicate(): void {
    console.log('todo');
  }

  onInstructionsUpdated(instructions: Array<string>): void {
    this.recipe.instructions = instructions;
    this.updateRecipe();
  }

  onIngredientsUpdated(ingredients: Array<Ingredient>): void {
    this.recipe.ingredients = ingredients;
    this.updateRecipe();
  }

  onRecipeTagsChanged(tags: Array<string>): void {
    this.recipe.tags = new Set(tags);
    this.updateRecipe();
  }

  updateRecipe(): void {
    this.recipeService.replaceRecipe(this.recipe.id, this.recipe);
  }

  onRecipeChanged(recipe: Recipe): void {
    this.recipe = recipe;
    this.updateRecipe();
  }
}
