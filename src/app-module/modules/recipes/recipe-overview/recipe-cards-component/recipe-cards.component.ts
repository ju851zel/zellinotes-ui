import {Component, OnInit} from '@angular/core';
import {Pagination, Recipe} from '../../../../model/recipe';
import {RecipeService} from '../../../../services/recipe-service/recipe.service';
import {NgxMasonryOptions} from 'ngx-masonry';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.css']
})
export class RecipeCardsComponent implements OnInit {
  public cardOptions: NgxMasonryOptions = {
    gutter: 15,
    horizontalOrder: true,
    fitWidth: true,
  };

  recipes: Array<Recipe> = [];
  pagination: Pagination;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.recipeService.recipes.subscribe((recipes) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.recipes.getValue();
    this.recipeService.pagination.subscribe((pagination) => {
      this.pagination = pagination;
    });
    this.pagination = this.recipeService.pagination.getValue();
  }

  navigateToSingleRecipe(id: string): void {
    this.router.navigate([`/recipes/${id}`], {relativeTo: this.activatedRoute});
  }


}
