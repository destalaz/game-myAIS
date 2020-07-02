import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
@Component({
  selector: 'popup-win',
  templateUrl: './popup-win.component.html',
  styleUrls: ['./popup-win.component.scss']
})
export class PopupWinComponent implements OnInit {
  open: boolean = false;
  reward: any;
  load: boolean;
  mobileId: string;
  playId: string
  winnerStatus: boolean

  constructor(private gameService: GameService) {
    this.load = false;
    this.reward = localStorage.getItem('rewardpoint');
    this.mobileId = sessionStorage.getItem('mobileId');
    this.playId = sessionStorage.getItem('playId');
    this.winnerStatus = true;
  }



  ngOnInit() {

    console.log(" ---- ")
    this.reward = localStorage.getItem('rewardpoint');
    
    console.log("gameOver  ==> ",localStorage.getItem("gameOver"))
    if (localStorage.getItem("gameOver")) {
      this.load = true;
      this.servedPlayResult(this.mobileId, this.playId, this.winnerStatus);
    }

  }
  openPage() {
    this.open = true;
  }

  servedPlayResult(mobileId, playId, winnerStatus) {
    this.gameService.getPlayResult(mobileId, playId, winnerStatus).subscribe(res => {
      if (res["resultCode"] === "20000" && res["status"] === true) {
        // sessionStorage.removeItem("playId");
        this.load = false;
      }
    });
  }

}
