import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-top-buttons',
  templateUrl: './top-buttons.component.html',
  styleUrls: ['./top-buttons.component.css']
})
export class TopButtonsComponent {

  @Input() editMode: boolean;

  @Output() navigateToRecipes = new EventEmitter<any>();
  @Output() editableToggled = new EventEmitter<any>();
  @Output() deleteRecipe = new EventEmitter<any>();
  @Output() downloadRecipe = new EventEmitter<any>();
  @Output() duplicateRecipe = new EventEmitter<any>();

  onNavigateToRecipes(): void {
    this.navigateToRecipes.emit(true);
  }

  onToggleEditable(): void {
    this.editableToggled.emit(true);
  }

  onDeleteRecipe(): void {
    this.deleteRecipe.emit(true);
  }

  onDownloadRecipe(): void {
    this.downloadRecipe.emit(true);
  }

  onDuplicateRecipe(): void {
    this.duplicateRecipe.emit(true);
  }

}
