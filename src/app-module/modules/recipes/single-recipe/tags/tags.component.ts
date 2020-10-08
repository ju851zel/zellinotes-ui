import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnChanges {

  @Input() editMode: boolean;
  @Input() defaultRecipeTags: Set<string>;

  recipeTags: Set<string>;

  @Output()
  recipeTagsChanged = new EventEmitter<Set<string>>();

  ngOnInit(): void {
    this.recipeTags = new Set(this.defaultRecipeTags);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultRecipeTags && !changes.defaultRecipeTags.isFirstChange()) {
      this.recipeTags = new Set(changes.defaultRecipeTags.currentValue);
    }
  }

  createTagInputValue(): string {
    const arr = [...this.recipeTags];
    return arr.join(' ');
  }

  onTagUpdate(value: string): void {
    this.recipeTags = new Set(value.split(' ').filter(tag => tag !== ''));
    this.recipeTagsChanged.emit(this.recipeTags);
  }
}
