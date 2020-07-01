import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
@Component({
  selector: 'popup-continue',
  templateUrl: './popup-continue.component.html',
  styleUrls: ['./popup-continue.component.scss']
})
export class PopupContinueComponent implements OnInit {
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
    this.load = true;
    this.servedPlayResult(this.mobileId, this.playId, this.winnerStatus);

  }
  openPage() {
    this.open = true;
  }

  servedPlayResult(mobileId, playId, winnerStatus) {
    this.gameService.getPlayResult(mobileId, playId, winnerStatus).subscribe(res => {
      if (res["resultCode"] === "20000" && res["status"] === true) { 
        sessionStorage.removeItem("playId");
        this.load = false;
      }
    });
  }

}
