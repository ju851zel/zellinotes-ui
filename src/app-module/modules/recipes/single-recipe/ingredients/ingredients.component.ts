import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ingredient, MeasurementUnit} from '../../../../model/recipe';
import * as lastElement from 'lodash/last';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit, OnChanges {

  @Input()
  defaultIngredients: Array<Ingredient>;
  @Input()
  editMode: boolean;

  @Output()
  ingredientsChanged = new EventEmitter<Array<Ingredient>>();

  ingredients: Array<Ingredient>;
  collapsed = false;

  ngOnInit(): void {
    this.ingredients = this.defaultIngredients.map(ing => ing.clone());
    this.addEmptyIngredientWhenNecessary();
  }

  trackByIngredients(index: number, item: Ingredient): number {
    return index;
  }

  viewMode(): boolean {
    return !this.editMode;
  }

  onSingleIngredientChanged(index: number, ingredient: Ingredient): void {
    console.log('---------singleIngredient changed', ingredient);
    this.ingredients[index] = ingredient;
    this.notifyIngredientsUpdated();
  }

  notifyIngredientsUpdated(): void {
    const finalIngredients = this.ingredients.filter(ing => ing.defined());
    this.ingredientsChanged.emit(finalIngredients);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultIngredients && !changes.defaultIngredients.isFirstChange()) {
      this.ingredients = changes.defaultIngredients.currentValue.map(ing => ing);
    }
    this.addEmptyIngredientWhenNecessary();
  }

  private addEmptyIngredientWhenNecessary(): void {
    if (!this.ingredientsIsDefined()) {
      return;
    }

    if (this.editMode) {
      if (this.ingredientsIsEmpty() || this.lastIngredientNotEmpty()) {
        this.ingredients.push(new Ingredient(this.ingredients.length.toString(), undefined, undefined, undefined));
      }
    } else {
      if (this.lastIngredientIsEmpty()) {
        this.ingredients.pop();
      }
    }
  }

  ingredientsIsDefined(): boolean {
    return !!this.ingredients;
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.notifyIngredientsUpdated();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  ingredientsIsEmpty(): boolean {
    return this.ingredients.length === 0;
  }

  ingredientsNotEmpty(): boolean {
    return this.ingredients.length > 0;
  }

  private lastIngredientNotEmpty(): boolean {
    return lastElement(this.ingredients)?.partlyDefined();
  }

  private lastIngredientIsEmpty(): boolean {
    return lastElement(this.ingredients)?.notDefined();
  }

  shortUnit(unit: MeasurementUnit): string {
    return MeasurementUnit.shortUnit(unit);
  }
}
