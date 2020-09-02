import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ingredient, MeasurementUnit} from '../../../../../model/recipe';


@Component({
  selector: 'app-single-ingredient',
  templateUrl: './single-ingredient.component.html',
})
export class SingleIngredientComponent implements OnInit, OnChanges {

  @Input()
  defaultIngredient: Ingredient;

  @Output()
  ingredientChanged = new EventEmitter<Ingredient>();

  @Output()
  deleteIngredient = new EventEmitter<boolean>();

  ingredient: Ingredient;
  allMeasurementUnits: Array<MeasurementUnit> = MeasurementUnit.allUnits;

  constructor() {
  }

  ngOnInit(): void {
    this.ingredient = this.defaultIngredient.clone();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultIngredient && !changes.defaultIngredient.isFirstChange()) {
      this.ingredient = changes.defaultIngredient.currentValue.clone();
    }
  }

  onDeleteIngredientClicked(): void {
    this.deleteIngredient.emit(true);
  }

  onAmountUpdated(amount: number): void {
    this.ingredient.amount = amount;
    this.notifyIngredientUpdated();
  }

  onMeasurementUnitUpdated(unit: MeasurementUnit): void {
    this.ingredient.measurementUnit = unit;
    this.notifyIngredientUpdated();
  }

  onTitleUpdated(title: string): void {
    this.ingredient.title = title;
    this.notifyIngredientUpdated();
  }

  notifyIngredientUpdated(): void {
    if (this.ingredient.defined()) {
      this.ingredientChanged.emit(this.ingredient);
    }
  }
}
