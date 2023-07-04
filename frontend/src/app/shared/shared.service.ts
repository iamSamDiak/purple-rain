import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private cols = 15;
  private rows = 10;
  private ifCollision = false;
  private points = 0;
  private startSubject = new Subject<void>();
  private gameOverSubject = new Subject<void>();

  startGame(): void {
    this.startSubject.next();
  }

  getStartgame(): Observable<void> {
    return this.startSubject.asObservable();
  }

  gameOver(): void {
    this.gameOverSubject.next();
  }

  getGameOver(): Observable<void> {
    return this.gameOverSubject.asObservable();
  }

  getCols(): number {
    return this.cols;
  }

  getRows(): number {
    return this.rows;
  }

  private playerTop = 150;
  private playerLeft = 150;

  getPlayerTop(): number {
    return this.playerTop;
  }

  setPlayerTop(top: number) {
    this.playerTop = top;
  }

  getPlayerLeft(): number {
    return this.playerLeft;
  }

  setPlayerLeft(left: number) {
    this.playerLeft = left;
  }

  getIfCollision(): boolean {
    return this.ifCollision;
  }

  setIfCollision(ifCollision: boolean) {
    this.ifCollision = ifCollision;
  }

  getPoints(): number {
    return this.points;
  }

  setPoints(points: number) {
    this.points = points;
  }
}
