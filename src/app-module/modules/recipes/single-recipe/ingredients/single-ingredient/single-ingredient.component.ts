import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ingredient, MeasurementUnit} from '../../../../../model/recipe';

class MutableIngredient {
  constructor(public id: number,
              public amount: number,
              public title: string,
              public unit: string) {
  }

  toImmutable(): Ingredient {
    return new Ingredient(
      this.id,
      this.amount,
      this.title,
      MeasurementUnit.allUnits.find(unit => unit.title === this.unit),
    );
  }
}


@Component({
  selector: 'app-single-ingredient',
  templateUrl: './single-ingredient.component.html',
})
export class SingleIngredientComponent implements OnInit {

  @Input()
  defaultIngredient: Ingredient;

  @Output()
  ingredientChanged = new EventEmitter<Ingredient>();

  @Output()
  deleteIngredient = new EventEmitter<boolean>();

  ingredient: MutableIngredient;
  allMeasurementUnits: Array<MeasurementUnit> = MeasurementUnit.allUnits;

  constructor() {
  }

  ngOnInit(): void {
    const ing = this.defaultIngredient.copy();
    this.ingredient = new MutableIngredient(ing.id, ing.amount, ing.title, ing.measurementUnit?.title);
  }

  ingredientUpdated(): void {
    console.log(this.ingredient);
    this.ingredientChanged.emit(this.ingredient.toImmutable());
  }

  onDeleteIngredientClicked(): void {
    this.deleteIngredient.emit(true);
  }
}
