import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {UpdateResult} from '../../../../model/recipe';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-top-buttons',
  templateUrl: './top-buttons.component.html',
  styleUrls: ['./top-buttons.component.css']
})
export class TopButtonsComponent implements OnInit {

  @Input() editMode: boolean;
  @Input() updateResult: BehaviorSubject<UpdateResult>;

  @Output() navigateToRecipes = new EventEmitter<boolean>();
  @Output() editableToggled = new EventEmitter<boolean>();
  @Output() deleteRecipe = new EventEmitter<boolean>();
  @Output() downloadRecipe = new EventEmitter<boolean>();
  @Output() duplicateRecipe = new EventEmitter<boolean>();

  update = UpdateResult.Success;

  constructor(private spinner: NgxSpinnerService) {
    this.spinner.show('updatedRecipeSpinner');
  }

  ngOnInit(): void {
    this.updateResult.subscribe((upd) => {
      this.update = upd;
    });
  }

  updateSuccessful(): boolean {
    return this.update === UpdateResult.Success;
  }

  updateError(): boolean {
    return this.update === UpdateResult.Error;
  }

  updateWaiting(): boolean {
    return this.update === UpdateResult.Waiting;
  }


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
