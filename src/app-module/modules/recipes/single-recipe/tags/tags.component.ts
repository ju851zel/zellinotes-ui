import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Input() editMode: boolean;
  @Input() defaultRecipeTags: Set<string>;

  get recipeTags(): Array<string> {
    return this.$recipeTags;
  }

  set recipeTags(value: Array<string>) {
    this.$recipeTags = cloneDeep(value);
    this.recipeTagsChanged.emit(this.$recipeTags);
  }

  private $recipeTags: Array<string>;

  @Output()
  recipeTagsChanged = new EventEmitter<Array<string>>();

  ngOnInit(): void {
    this.recipeTags = cloneDeep(this.defaultRecipeTags);
  }

  createTagInputValue(): string {
    return [...this.recipeTags].join(' ');
  }

  onTagUpdate(value: string): void {
    this.recipeTags = value.split(' ').filter(tag => tag !== '');
  }
}
