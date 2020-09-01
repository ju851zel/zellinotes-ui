import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ingredient} from '../../../../model/recipe';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  @Input()
  private defaultIngredients: Array<Ingredient>;

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

  addIngredient(event: Event): void {
    event.stopPropagation();
    this.ingredients.push(new Ingredient(this.ingredients.length, undefined, undefined, undefined));
    this.ingredientsUpdated();
    this.showCollapse();
  }

  showCollapse(): void {
    this.collapsed = false;
  }

  singleIngredientUpdated(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.ingredientsUpdated();
  }

  ingredientsUpdated(): void {
    this.ingredientsChanged.emit(this.ingredients);
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsUpdated();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }
}
