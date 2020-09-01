import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';

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

  ngOnInit(): void {
    this.instructions = cloneDeep(this.defaultInstructions);
    this.addEmptyInstructionWhenNecessary();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.addEmptyInstructionWhenNecessary();
  }

  private addEmptyInstructionWhenNecessary(): void {
    if (!this.instructionsAreSet()) {
      return;
    }

    if (this.editMode) {
      if (this.noInstructions() || (this.minOneInstruction() && this.lastInstructionNotEmpty())) {
        this.instructions.push('');
      }
    } else {
      if (this.minOneInstruction() && this.lastInstructionIsEmpty()) {
        this.instructions.pop();
      }
    }
  }

  private instructionsAreSet(): boolean {
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

  notifyInstructionsUpdated(): void {
    const finalInstructions = this.instructions.filter(inst => inst.length > 0);
    this.instructionChanged.emit(finalInstructions);
  }

  private lastInstructionNotEmpty(): boolean {
    return this.instructions[this.instructions.length - 1].length !== 0;
  }

  private lastInstructionIsEmpty(): boolean {
    return this.instructions[this.instructions.length - 1].length === 0;
  }

  noInstructions(): boolean {
    return this.instructions.length === 0;
  }

  minOneInstruction(): boolean {
    return this.instructions.length > 0;
  }

  updateInstruction(instruction: string, index: number): void {
    this.instructions[index] = instruction;
    this.notifyInstructionsUpdated();
  }
}
