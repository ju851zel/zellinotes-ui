import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Difficulty, Recipe} from '../../../../model/recipe';
import {RecipeService} from '../../../../services/recipe-service/recipe.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public editable = false;
  public loadingRecipe = true;

  private recipeSubscriber: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    const recipeId = this.getRecipeIdFromURL();
    this.recipeSubscriber = this.recipeService.recipes.subscribe(recipes => {
      const foundRecipe = recipes.find(recipe => recipe.id === recipeId);
      if (foundRecipe) {
        this.loadingRecipe = false;
        this.recipe = foundRecipe;
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

  totalTimeFormatted(time: string): string {
    const totalTime = parseInt(time, 10);
    const hours = (totalTime / 60).toFixed(0);
    const minutes = totalTime % 60;
    if (hours === '0') {
      return `${minutes} min`;
    } else {
      return `${hours} h ${minutes} min`;
    }
  }

  navigateToRecipes(): void {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  toggleEditable(): void {
    this.editable = !this.editable;
  }

  instructionsUpdated(instructions: Array<string>): void {
    this.updateRecipe(this.recipe.copyButInstructions(instructions));
  }

  deleteRecipe() {
    console.log('todo');
  }

  downloadRecipe() {
    console.log('todo');
  }

  duplicate() {
    console.log('todo');
  }

  updateRecipe(recipe: Recipe): void {
    this.recipeService.replaceRecipe(this.recipe.id, recipe);
  }

  onTitleUpdate(value: string): void {
    this.updateRecipe(this.recipe.copyButTitle(value));
  }

  onDescriptionUpdate(value: string): void {
    this.updateRecipe(this.recipe.copyButDescription(value));
  }

  setDifficultyEasy(): void {
    this.updateRecipe(this.recipe.copyButDifficulty(Difficulty.EASY));
  }

  setDifficultyHard(): void {
    this.updateRecipe(this.recipe.copyButDifficulty(Difficulty.HARD));
  }

  setDifficultyMedium(): void {
    this.updateRecipe(this.recipe.copyButDifficulty(Difficulty.MEDIUM));
  }

  setDefaultServings(servings: number): void {
    this.updateRecipe(this.recipe.copyButDefaultServings(servings));
  }

  updateCookingTime(time: string): void {
    this.updateRecipe(this.recipe.copyButTotalTime(parseInt(time, 10)));
  }


}
