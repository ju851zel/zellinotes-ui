import {Component, OnInit} from '@angular/core';
import {Pagination, PaginationSorting} from '../../../../model/recipe';
import {RecipeService} from '../../../../services/recipe-service/recipe.service';

@Component({
  selector: 'app-recipe-pagination',
  templateUrl: './recipe-pagination.component.html',
  styleUrls: ['./recipe-pagination.component.css']
})

export class RecipePaginationComponent implements OnInit {

  constructor(private recipeService: RecipeService) {
  }

  pagination: Pagination = {ascending: true, itemsPerPage: 10, page: 1, sort: PaginationSorting.Title};


  ngOnInit(): void {
    this.recipeService.pagination.subscribe(p => this.pagination = p);
  }


  pageUpdated(page: number): void {
    this.pagination.page = page;
    this.emit();
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
    console.log('pagination updated');
    this.recipeService.updatePagination(this.pagination);
  }
}
