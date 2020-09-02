import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnChanges {

  @Input() editMode: boolean;
  @Input() defaultRecipeTags: Set<string>;


  recipeTags: Array<string>;

  @Output()
  recipeTagsChanged = new EventEmitter<Array<string>>();

  ngOnInit(): void {
    this.recipeTags = [...this.defaultRecipeTags].map(tag => tag);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultRecipeTags && !changes.defaultRecipeTags.isFirstChange()) {
      this.recipeTags = [...changes.defaultRecipeTags.currentValue].map(tag => tag);
    }
  }

  createTagInputValue(): string {
    return this.recipeTags.join(' ');
  }

  onTagUpdate(value: string): void {
    this.recipeTags = value.split(' ').filter(tag => tag !== '');
    this.recipeTagsChanged.emit(this.recipeTags);
  }
}
