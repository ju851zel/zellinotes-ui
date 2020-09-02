import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Difficulty, Recipe} from '../../../../model/recipe';

@Component({
  selector: 'app-basic-properties',
  templateUrl: './basic-properties.component.html',
  styleUrls: ['./basic-properties.component.css']
})
export class BasicPropertiesComponent implements OnInit, OnChanges {

  @Input() editMode: boolean;
  @Input() defaultRecipe: Recipe;

  @Output() recipeChanged = new EventEmitter<Recipe>();

  recipe: Recipe;

  ngOnInit(): void {
    this.recipe = this.defaultRecipe.clone();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.recipe && !changes.recipe.isFirstChange()) {
      this.recipe = this.defaultRecipe.clone();
    }
  }

  setDifficultyEasy(): void {
    this.recipe.difficulty = Difficulty.EASY;
    this.notifyRecipeChanged();
  }

  setDifficultyMedium(): void {
    this.recipe.difficulty = Difficulty.MEDIUM;
    this.notifyRecipeChanged();
  }

  setDifficultyHard(): void {
    this.recipe.difficulty = Difficulty.HARD;
    this.notifyRecipeChanged();
  }

  setDefaultServings(serving: number): void {
    this.recipe.defaultServings = serving;
    this.notifyRecipeChanged();
  }

  formatCookingTimeToHourMin(totalTime: number): string {
    const hours = parseInt((totalTime / 60).toString(), 10);
    const minutes = totalTime % 60;
    if (hours === 0) {
      return `${minutes} min`;
    } else {
      return `${hours} h ${minutes} min`;
    }
  }

  onRecipeTitleChange(title: string): void {
    this.recipe.title = title;
    this.notifyRecipeChanged();
  }

  onRecipeDescriptionChanged(description: string): void {
    this.recipe.description = description;
    this.notifyRecipeChanged();
  }

  onRecipeCookingTimeChanged(cookingTime: number): void {
    this.recipe.cookingTimeInMinutes = cookingTime;
    this.notifyRecipeChanged();
  }

  notifyRecipeChanged(): void {
    this.recipeChanged.emit(this.recipe);
  }
}
