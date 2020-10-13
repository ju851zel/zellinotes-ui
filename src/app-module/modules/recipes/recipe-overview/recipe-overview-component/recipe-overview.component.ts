import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../../../services/recipe-service/recipe.service';
import {Difficulty, Recipe} from '../../../../model/recipe';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styles: [],
})
export class RecipeOverviewComponent implements OnInit {

  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  recipes: any;

  ngOnInit(): void {
    this.fetchCurrentTabRecipes();
  }

  createDefaultRecipe(): void {
    this.recipeService.addDefaultRecipe();
  }

  uploadSingleRecipe(recipe: Recipe): void {
    this.recipeService.addRecipe(recipe);
  }

  uploadMultipleRecipes(recipes: [Recipe]): void {
    this.recipeService.addMultipleRecipes(recipes);
  }

  fetchCurrentTabRecipes(): void {
    this.recipeService.fetchAllRecipes();
  }


  downloadRecipes(): void {
    //
  }

  navigateToSingleRecipe(id: string): void {
    this.router.navigate([`/${id}`], {relativeTo: this.activatedRoute});
  }
}
