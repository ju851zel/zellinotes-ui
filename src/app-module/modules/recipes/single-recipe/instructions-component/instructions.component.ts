import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit, OnChanges {


  @Input()
  private defaultInstructions: Array<string>;

  @Output()
  instructionChanged = new EventEmitter<Array<string>>();

  instructions: Array<string>;

  ngOnInit(): void {
    this.instructions = Object.assign([], this.defaultInstructions);
  }

  ngOnChanges(changes: any): void {
    console.log(changes);
  }

  trackByInstructions(index: number, item: any): number {
    return index;
  }

  addInstruction(): void {
    this.instructions.push('');
    this.instructionChanged.emit(this.instructions);
  }

  instructionsUpdated(): void {
    this.instructionChanged.emit(this.instructions);
  }

  deleteInstruction(index: number): void {
    this.instructions.splice(index, 1);
    this.instructionChanged.emit(this.instructions);
  }


}
