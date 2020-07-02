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
  }


  ngOnInit() {
    this.load = true;
    this.servedPlayReward(this.mobileId, this.playId);

  }
  openPage() {
    this.open = true;
  }

  servedPlayReward(mobileId, playId) {
    this.gameService.getReward(mobileId, playId).subscribe(res => {
      if (res["resultCode"] === "20000" && res["data"].status === "20000" && res["data"].description === "SUCCESS") {
        sessionStorage.removeItem("playId");
        this.load = false;
      }
    });


  }

}
