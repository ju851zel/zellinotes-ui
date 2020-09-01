import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  @Input()
  private defaultInstructions: Array<string>;

  @Output()
  instructionChanged = new EventEmitter<Array<string>>();

  instructions: Array<string>;
  collapsed = false;

  ngOnInit(): void {
    this.instructions = Object.assign([], this.defaultInstructions);
  }

  trackByInstructions(index: number, item: any): number {
    return index;
  }

  addInstruction(event:Event): void {
    event.stopPropagation();
    this.instructions.push('');
    this.instructionsUpdated();
    this.showCollapse();
  }

  showCollapse(): void {
    this.collapsed = false;
  }

  instructionsUpdated(): void {
    this.instructionChanged.emit(this.instructions);
  }

  deleteInstruction(index: number): void {
    this.instructions.splice(index, 1);
    this.instructionsUpdated();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }
}
