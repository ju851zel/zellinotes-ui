import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ingredient} from '../../../../model/recipe';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit, OnChanges {

  @Input()
  private defaultIngredients: Array<Ingredient>;
  @Input()
  private editable: boolean;

  @Output()
  ingredientsChanged = new EventEmitter<Array<Ingredient>>();

  ingredients: Array<Ingredient>;
  collapsed = false;

  ngOnInit(): void {
    this.ingredients = Object.assign([], this.defaultIngredients);
  }

  trackByIngredients(index: number, item: Ingredient): number {
    return item.id;
  }

  editMode(): boolean {
    return this.editable;
  }

  viewMode(): boolean {
    return !this.editMode();
  }

  singleIngredientUpdated(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.notifyIngredientsUpdated();
  }

  notifyIngredientsUpdated(): void {
    this.ingredientsChanged.emit(Array.from(this.ingredients));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultIngredients) {
      this.ingredients = changes.defaultIngredients.currentValue;
      console.log(this.ingredients);
    } else {
      return;
    }

    if (this.editMode() && this.lastIngredientNotEmpty()) {
      this.ingredients.push(new Ingredient(this.ingredients.length, undefined, undefined, undefined));
    } else if (this.viewMode() && this.lastIngredientIsEmpty()) {
      this.ingredients.pop();
    }
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.notifyIngredientsUpdated();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  noIngredients(): boolean {
    return this.ingredients.length === 0;
  }

  minOneIngredient(): boolean {
    return this.ingredients.length > 0;
  }

  private lastIngredientNotEmpty(): boolean {
    return this.ingredients?.length === 0 || this.ingredients[this.ingredients.length - 1].partlyDefined();
  }

  private lastIngredientIsEmpty(): boolean {
    return this.ingredients?.length > 0 && this.ingredients[this.ingredients.length - 1].notDefined();
  }
}
