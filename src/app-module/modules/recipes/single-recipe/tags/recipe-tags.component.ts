import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../../../../services/recipe-service/recipe.service';
import {Recipe} from '../../../../model/recipe';

@Component({
  selector: 'app-recipe-tags',
  templateUrl: './recipe-tags.component.html',
  styleUrls: ['./recipe-tags.component.css']
})
export class RecipeTagsComponent implements OnInit {

  @Input()
  public recipe: Recipe;

  @Input()
  public editable: boolean;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    console.log(this.recipe);
  }

  createTagInputValue(): string {
    return [...this.recipe.tags].join(' ');
  }

  onTagUpdate(value: string): void {
    const tags = value.split(' ').filter(tag => tag !== '');
    this.updateRecipe(this.recipe.copyButTags(new Set(tags)));
  }

  updateRecipe(recipe: Recipe): void {
    this.recipeService.replaceRecipe(this.recipe.id, recipe);
  }
}