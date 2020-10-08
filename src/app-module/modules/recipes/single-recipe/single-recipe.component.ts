import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Ingredient, Recipe} from '../../../model/recipe';
import {RecipeService} from '../../../services/recipe-service/recipe.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public editMode = false;

  private recipeSubscriber: Subscription;

  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private notifier: NotifierService,
              public recipeService: RecipeService) {
  }


  ngOnInit(): void {
    this.spinner.show('pageIsLoadingSpinner');
    const recipeId = this.getRecipeIdFromURL();
    this.recipeSubscriber = this.recipeService.recipes.subscribe(recipes => {
      const foundRecipe = recipes.find(recipe => recipe.id === recipeId);
      if (foundRecipe) {
        this.spinner.hide('pageIsLoadingSpinner');
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
    this.recipeService.deleteRecipe(this.recipe.id);
  }

  downloadRecipe(): void {
    this.recipeService.downloadRecipe(this.recipe.id);
  }

  duplicate(): void {
    this.recipeService.duplicateRecipe(this.recipe.id);
  }

  onInstructionsUpdated(instructions: Array<string>): void {
    this.recipe.instructions = instructions;
    this.updateRecipeWithoutImage();
  }

  onIngredientsUpdated(ingredients: Array<Ingredient>): void {
    this.recipe.ingredients = ingredients;
    this.updateRecipeWithoutImage();
  }

  onRecipeTagsChanged(tags: Array<string>): void {
    this.recipe.tags = tags;
    this.updateRecipeWithoutImage();
  }

  updateRecipeWithoutImage(): void {
    this.recipe.lastModified = new Date();
    this.recipeService.updateRecipeWithoutImage(this.recipe);
  }

  updateRecipeImage(): void {
    this.recipe.lastModified = new Date();
    this.recipeService.updateRecipeImage(this.recipe);
  }

  deleteRecipeImage(): void {
    this.recipe.lastModified = new Date();
    this.recipeService.deleteRecipeImage(this.recipe.id);
  }

  onRecipeChanged(recipe: Recipe): void {
    this.recipe = recipe;
    this.updateRecipeWithoutImage();
  }

  onImageChanged(image: string | null): void {
    this.recipe.image = image;
    if (image) {
      this.updateRecipeImage();
    } else {
      this.deleteRecipeImage();
    }
  }
}
