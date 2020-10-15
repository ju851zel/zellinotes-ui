import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../../../services/recipe-service/recipe.service';
import {Pagination, PaginationSorting, Recipe} from '../../../../model/recipe';
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

  pagination: Pagination;

  ngOnInit(): void {
    this.fetchCurrentTabRecipes();
    this.recipeService.pagination.subscribe(p => this.pagination = p);
    this.pagination = this.recipeService.pagination.getValue();
  }


  itemsPerPageUpdated(itemsPerPage: number): void {
    this.pagination.itemsPerPage = itemsPerPage;
    this.emit();
  }

  ascendingUpdated(ascending: boolean): void {
    this.pagination.ascending = ascending;
    this.emit();
  }

  sortingSetTitle(): void {
    this.pagination.sort = PaginationSorting.Title;
    this.emit();
  }

  sortingSetLastModified(): void {
    this.pagination.sort = PaginationSorting.LastModified;
    this.emit();
  }

  sortingSetCreated(): void {
    this.pagination.sort = PaginationSorting.Created;
    this.emit();
  }

  emit(): void {
    console.log('Sorting updated');
    this.recipeService.updatePagination(this.pagination);
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
