import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit, OnChanges {

  @Input()
  private defaultInstructions: Array<string>;
  @Input()
  private editable: boolean;

  @Output()
  instructionChanged = new EventEmitter<Array<string>>();

  instructions: Array<string>;
  collapsed = false;

  ngOnInit(): void {
    this.instructions = Object.assign([], this.defaultInstructions);
  }

  editMode(): boolean {
    return this.editable;
  }

  viewMode(): boolean {
    return !this.editMode();
  }

  trackByInstructions(index: number, item: any): number {
    return index;
  }

  private lastInstructionNotEmpty(): boolean {
    return this.instructions?.length === 0 || this.instructions[this.instructions.length - 1].length !== 0;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editMode() && this.lastInstructionNotEmpty()) {
      this.instructions.push('');
    } else if (this.viewMode() && this.lastInstructionIsEmpty()) {
      this.instructions.pop();
    }
  }


  private lastInstructionIsEmpty(): boolean {
    return !!this.instructions && this.instructions[this.instructions.length - 1].length === 0;
  }

  noInstructions(): boolean {
    return this.instructions.length === 0;
  }

  minOneInstruction(): boolean {
    return this.instructions.length > 0;
  }
}
