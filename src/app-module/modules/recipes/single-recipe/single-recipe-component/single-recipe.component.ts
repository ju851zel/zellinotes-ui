import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit {
  edit: boolean;
  recipeId: void;

  constructor() { }

  ngOnInit(): void {
  }

  navigateToRecipes() {

  }

  switchEdit() {

  }

  deleteRecipe() {

  }

  downloadRecipe() {

  }

  duplicate() {

  }
}
