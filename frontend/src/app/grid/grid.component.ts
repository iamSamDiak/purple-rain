import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { PlayerComponent } from './player/player.component';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {
  constructor(private sharedService: SharedService, private renderer: Renderer2, private elementRef: ElementRef) {}

  images: string[] = [
    "assets/obstacles/","assets/obstacles/","assets/obstacles/",
    "assets/obstacles/","assets/obstacles/","assets/obstacles/",
    "assets/obstacles/","assets/obstacles/","assets/obstacles/",
    "assets/obstacles/",
  ];
  cols: number = this.sharedService.getCols();
  rows: number = this.sharedService.getRows();
  colsCount!: any[];
  rowsCount!: any[];

  get ifGameStarted(): boolean{
    return this.sharedService.getIfCollision();
  }

  ngOnInit() {
    this.colsCount = Array.from({ length: this.cols });
    this.rowsCount = Array.from({ length: this.rows });
    this.startGame()
  }

  startGame(){
    this.sharedService.getStartgame().subscribe(() => {
      if (!this.ifGameStarted){
        let time
        const interval = setInterval(() => {
          //time = 200 / ( this.sharedService.getPoints() /75 + 1)
          if (this.sharedService.getIfCollision()){
            clearInterval(interval);
          }
          this.createDynamicElement()
        }, 200)
      }
    })
  }

  createDynamicElement(){
    const time = 200 / ( this.sharedService.getPoints() /25 + 1)
    const newElement = this.renderer.createElement("div")
    const randomNumber = this.generateRandomNumber()
    //
    const audio = new Audio("assets/bell.mp3")
    audio.volume = 0.08
    const audioGameOver = new Audio("assets/game_over.mp3")
    audioGameOver.volume = 0.5
    //
    this.renderer.addClass(newElement, 'obstacle');
    this.renderer.setStyle(newElement, 'left', `${randomNumber}px`);
    this.renderer.appendChild(this.elementRef.nativeElement, newElement);
    //
    let top = 0;

    const interval = setInterval(() => {

      //if Gameover
      if (this.sharedService.getIfCollision()){
        this.renderer.removeChild(this.elementRef.nativeElement, newElement);
        clearInterval(interval);
      }

      //if obstacle at the bottom
      if (top >= this.cols * 50) {
        if (!this.sharedService.getIfCollision()){
          let points = this.sharedService.getPoints()
          this.sharedService.setPoints(points+=1);
          audio.play()
        }
        this.renderer.removeChild(this.elementRef.nativeElement, newElement);
        clearInterval(interval);
      }

      if (top === this.sharedService.getPlayerTop() && randomNumber === this.sharedService.getPlayerLeft()) {
        this.sharedService.setIfCollision(true);
        this.sharedService.gameOver();
        audioGameOver.play()
      }

      this.renderer.setStyle(newElement, 'top', `${top}px`);
      top += 50;

    }, time)
  }

  getTop(): string{
    return `${this.sharedService.getPlayerTop()}px`;
  }

  getLeft(): string{
    return `${this.sharedService.getPlayerLeft()}px`;
  }

  generateRandomNumber() {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 450 + 1); // Generate a random number between 0 and 500
    } while (randomNumber % 50 !== 0); // Repeat until the number satisfies x % 10 = 0 condition
    return randomNumber;
  }

}
