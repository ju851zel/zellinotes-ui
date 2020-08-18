import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../../../model/recipe';
import {RecipeService} from '../../../../services/recipe-service/recipe.service';
import { NgxMasonryOptions } from 'ngx-masonry';


@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.css']
})
export class RecipeCardsComponent implements OnInit {
  public cardOptions: NgxMasonryOptions = {
    gutter: 15,
  };

  recipes: Array<Recipe> = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipes.subscribe((recipes) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.recipes.getValue();
  }

  navigateToSingleRecipe(id: any) {

  }
}
