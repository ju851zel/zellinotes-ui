import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Pagination, PaginationSorting} from '../../../../model/recipe';

@Component({
  selector: 'app-recipe-pagination',
  templateUrl: './recipe-pagination.component.html',
  styleUrls: ['./recipe-pagination.component.css']
})

export class RecipePaginationComponent implements OnInit {

  constructor() {
  }

  @Output()
  paginationChanged = new EventEmitter<Pagination>();
  pagination: Pagination = {ascending: true, itemsPerPage: 10, page: 1, sort: PaginationSorting.Title};

  ngOnInit(): void {
    this.paginationChanged.emit(this.pagination);
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
    this.paginationChanged.emit(this.pagination);
  }
}
