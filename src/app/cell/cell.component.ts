import { Component, Input } from '@angular/core';
import { CellStates } from './CellStates';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() public cell: CellStates = CellStates.EMPTY;
  @Input() public row: number = 0;
  @Input() public col: number = 0;
}
