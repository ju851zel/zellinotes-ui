import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as lastElement from 'lodash/last';
import {DndDropEvent} from 'ngx-drag-drop';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit, OnChanges {

  @Input()
  defaultInstructions: Array<string>;
  @Input()
  editMode: boolean;

  @Output()
  instructionChanged = new EventEmitter<Array<string>>();

  instructions: Array<string>;
  collapsed = false;

  draggable = {
    effectAllowed: 'move',
    handle: true
  };


  onInstructionDrop(event: DndDropEvent): void {
    const indexDestination = event.index;
    const indexSource = event.data;
    const element = this.instructions[indexSource];
    if (indexSource > indexDestination) {
      this.instructions.splice(indexSource, 1);
      this.instructions.splice(indexDestination, 0, element);
    } else if (indexDestination > indexSource) {
      this.instructions.splice(indexSource, 1);
      this.instructions.splice(indexDestination - 1, 0, element);
    }
  }

  ngOnInit(): void {
    this.instructions = this.defaultInstructions.map(inst => inst);
    console.log('defaultinst:', this.defaultInstructions);
    console.log('inst:', this.defaultInstructions);
    this.addEmptyInstructionWhenNecessary();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultInstructions && !changes.defaultInstructions.isFirstChange()) {
      this.instructions = changes.defaultInstructions.currentValue.map(inst => inst);
    }
    this.addEmptyInstructionWhenNecessary();
  }

  updateInstruction(instruction: string, index: number): void {
    this.instructions[index] = instruction;
    this.notifyInstructionsUpdated();
  }

  private addEmptyInstructionWhenNecessary(): void {
    if (!this.instructionsIsDefined()) {
      return;
    }

    if (this.editMode) {
      if (this.instructionsIsEmpty() || this.lastInstructionNotEmpty()) {
        this.instructions.push('');
      }
    } else {
      if (this.lastInstructionIsEmpty()) {
        this.instructions.pop();
      }
    }
  }

  private instructionsIsDefined(): boolean {
    return !!this.instructions;
  }

  viewMode(): boolean {
    return !this.editMode;
  }

  trackByInstructions(index: number, item: any): number {
    return index;
  }

  deleteInstruction(index: number): void {
    this.instructions.splice(index, 1);
    this.notifyInstructionsUpdated();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  private lastInstructionNotEmpty(): boolean {
    return lastElement(this.instructions)?.length > 0;
  }

  private lastInstructionIsEmpty(): boolean {
    return lastElement(this.instructions)?.length === 0;
  }

  instructionsIsEmpty(): boolean {
    return this.instructions.length === 0;
  }

  instructionsNotEmpty(): boolean {
    return this.instructions.length > 0;
  }

  notifyInstructionsUpdated(): void {
    const finalInstructions = this.instructions.filter(inst => inst.length > 0);
    this.instructionChanged.emit(finalInstructions);
  }
}
