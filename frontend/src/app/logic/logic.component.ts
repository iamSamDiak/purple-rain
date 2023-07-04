import { Component, HostListener } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-logic',
  templateUrl: './logic.component.html',
  styleUrls: ['./logic.component.css']
})

export class LogicComponent {
  constructor(private sharedService: SharedService) {}
  pixelMove = 50;

  get points(): number{
    return this.sharedService.getPoints();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    
    if (!this.sharedService.getIfCollision()){

      if (event.key === 'z' || event.key === 'ArrowUp') {
        this.updateTop(-this.pixelMove)
      }
      if (event.key === 'q' || event.key === 'ArrowLeft') {
        this.updateLeft(-this.pixelMove)
      }
      if (event.key === 'd' || event.key === 'ArrowRight') {
        this.updateLeft(this.pixelMove)
      }
      if (event.key === 's' || event.key === 'ArrowDown') {
        this.updateTop(this.pixelMove)
      }

    }
  }

  updateTop(pixel: number) {
    const currentTop = this.sharedService.getPlayerTop();
    const colsMax = this.sharedService.getCols();
    if (currentTop + pixel >= colsMax * this.pixelMove || currentTop + pixel < 0) {
      return
    }
    this.sharedService.setPlayerTop(currentTop + pixel);
  }

  updateLeft(pixel: number) {
    const currentLeft = this.sharedService.getPlayerLeft();
    const rowsMax = this.sharedService.getRows();
    if (currentLeft + pixel >= rowsMax * this.pixelMove || currentLeft + pixel < 0) {
      return
    }
    this.sharedService.setPlayerLeft(currentLeft + pixel);
  }
}
