import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnChanges {

  @Input() editMode: boolean;
  @Input() defaultRecipeTags: Array<string>;

  recipeTags: Array<string>;

  @Output()
  recipeTagsChanged = new EventEmitter<Array<string>>();

  ngOnInit(): void {
    this.recipeTags = this.defaultRecipeTags;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultRecipeTags && !changes.defaultRecipeTags.isFirstChange()) {
      this.recipeTags = changes.defaultRecipeTags.currentValue;
    }
  }

  createTagInputValue(): string {
    const arr = this.recipeTags;
    return arr.join(' ');
  }

  onTagUpdate(value: string): void {
    this.recipeTags = value.split(' ').filter(tag => tag !== '');
    this.recipeTagsChanged.emit(this.recipeTags);
  }
}
