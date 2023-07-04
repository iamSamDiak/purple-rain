import { Component, NgModule, Renderer2 } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  hasGameStarted: boolean = false;
  isGameOver: boolean = false;

  constructor(private sharedService: SharedService, private renderer: Renderer2, private httpClient: HttpClient) {
    this.gameOver()
  }

  startGame(){
    this.sharedService.setPoints(0);
    this.sharedService.setIfCollision(false);

    this.sharedService.startGame();
    this.hasGameStarted = true;

    const audioGameStart = new Audio("assets/game_start.mp3")
    audioGameStart.volume = 0.2
    audioGameStart.play()
  }

  gameOver(){
    this.sharedService.getGameOver().subscribe(() => {
      this.isGameOver = true;
    })
  }

  restart(){
    this.isGameOver = false;
    this.startGame();
  }

  savePoints(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const points = this.sharedService.getPoints();
    this.httpClient.post<any>('http://localhost:3000/savePoints', { votre_record_de_points: points, commentaire: "Alors, entretien...? ;)" }, { headers }).subscribe(
      (response) => {
        window.open(response.link, '_blank');
      },
      (error) => {
        console.error('Error saving points:', error);
      }
    );
  }

  downloadLink(url: string){
    const aLink = document.querySelector(".aLink") as HTMLAnchorElement;
    aLink.href = url;
    aLink.click();
  }
}
