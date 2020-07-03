import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/service/game.service';
@Component({
  selector: 'game-aunjai',
  templateUrl: './aunjai.component.html',
  styleUrls: ['./aunjai.component.scss']
})
export class AunjaiComponent implements OnInit {
  url = '../../../assets/aunjaiAssets/js/script.js';
  language: any;
  ngOnInit() {
    this.loadScript();

    localStorage.setItem("gameOver", "false");
    this.language = localStorage.getItem('language');
  }

  mobileId: string;
  playId: string

  load: boolean;

  constructor(private router: Router, private gameService: GameService) {
    this.load = false;
    this.mobileId = sessionStorage.getItem('mobileId');
    this.playId = sessionStorage.getItem('playId');
  }
  public loadScript() {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }


  // checkOverGame() {
  //   if (localStorage.getItem("gameOver") === "true") {
  //     this.load = true;
  //     var winnerStatus = false;
  //     this.servedPlayResult(this.mobileId, this.playId, winnerStatus);
  //   }

  // }

  servedPlayResult(mobileId, playId, winnerStatus) {
    this.gameService.getPlayResult(mobileId, playId, winnerStatus).subscribe(res => {
      if (res["resultCode"] === "20000" && res["status"] === true) {
        if (winnerStatus.toString() === "false") {
          sessionStorage.removeItem('playId')
        }
        this.load = false;
      }
    });
  }

  // resultGameWin() {
  //   this.load = true;
  //   var winnerStatus = true;
  //   this.gameService.getPlayResult(this.mobileId, this.playId, winnerStatus).subscribe(res => {
  //     if (res["resultCode"] === "20000" && res["status"] === true) {
  //       this.load = false;
  //     }
  //   });
  // }

  resultGame(statusGame) {
    this.load = true;
    console.log("Boolean(statusGame) => ", statusGame)
    this.servedPlayResult(this.mobileId, this.playId, statusGame);
  }

}


