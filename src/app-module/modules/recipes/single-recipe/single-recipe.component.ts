import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Ingredient, Recipe} from '../../../model/recipe';
import {RecipeService} from '../../../services/recipe-service/recipe.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public editMode = false;
  public updatedInLast5secs = false;


  private recipeSubscriber: Subscription;

  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService) {
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
    if (!this.updatedInLast5secs) {
      this.updatedInLast5secs = true;
      setTimeout(() => {
        this.recipe.lastModified = new Date();
        this.recipeService.updateRecipe(this.recipe.id, this.recipe);
        this.updatedInLast5secs = false;
      }, 3000);
    }
  }

  onRecipeChanged(recipe: Recipe): void {
    this.recipe = recipe;
    this.updateRecipe();
  }

  onImageChanged(image: string): void {
    this.recipe.image = image;
    this.updateRecipe();
  }
}
