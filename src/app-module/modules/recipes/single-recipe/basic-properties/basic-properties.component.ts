import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Difficulty} from '../../../../model/recipe';

@Component({
  selector: 'app-basic-properties',
  templateUrl: './basic-properties.component.html',
  styleUrls: ['./basic-properties.component.css']
})
export class BasicPropertiesComponent {

  @Input() editMode: boolean;

  @Input()
  get recipeTitle(): string {
    return this.$recipeTitle;
  }

  set recipeTitle(value: string) {
    this.$recipeTitle = value;
    this.recipeTitleChanged.emit(value);
  }

  private $recipeTitle: string;

  @Input()
  get recipeDescription(): string {
    return this.$recipeDescription;
  }

  set recipeDescription(value: string) {
    this.$recipeDescription = value;
    this.recipeDescriptionChanged.emit(value);
  }

  private $recipeDescription: string;

  @Input()
  get recipeDifficulty(): Difficulty {
    return this.$recipeDifficulty;
  }

  set recipeDifficulty(value: Difficulty) {
    this.$recipeDifficulty = value;
    this.recipeDifficultyChanged.emit(value);
  }

  private $recipeDifficulty: Difficulty;

  @Input()
  get defaultServings(): number {
    return this.$defaultServings;
  }

  set defaultServings(value: number) {
    this.$defaultServings = value;
    this.recipeDefaultServingsChanged.emit(value);
  }

  private $defaultServings: number;

  @Input()
  get totalCookingTimeInMinutes(): number {
    return this.$totalCookingTimeInMinutes;
  }

  set totalCookingTimeInMinutes(value: number) {
    this.$totalCookingTimeInMinutes = value;
    this.recipeTotalTimeInMinutesChanged.emit(value);
  }

  private $totalCookingTimeInMinutes: number;


  @Output() recipeTitleChanged = new EventEmitter<string>();
  @Output() recipeDescriptionChanged = new EventEmitter<string>();
  @Output() recipeDifficultyChanged = new EventEmitter<Difficulty>();
  @Output() recipeDefaultServingsChanged = new EventEmitter<number>();
  @Output() recipeTotalTimeInMinutesChanged = new EventEmitter<number>();


  setDifficultyEasy(): void {
    this.recipeDifficulty = Difficulty.EASY;
  }

  setDifficultyMedium(): void {
    this.recipeDifficulty = Difficulty.MEDIUM;
  }

  setDifficultyHard(): void {
    this.recipeDifficulty = Difficulty.HARD;
  }

  setDefaultServings(serving: number): void {
    this.defaultServings = serving;
  }

  formatTotalTimeToHourMin(totalTime: number): string {
    const hours = parseInt((totalTime / 60).toString(), 10);
    const minutes = totalTime % 60;
    if (hours === 0) {
      return `${minutes} min`;
    } else {
      return `${hours} h ${minutes} min`;
    }

  }
}
