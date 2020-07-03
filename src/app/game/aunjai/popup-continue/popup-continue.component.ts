import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';
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
  playerComplete: boolean;
  playComplete:boolean;

  constructor(private gameService: GameService ,   private router: Router) {
    this.load = false;
    this.reward = ""

  }


  ngOnInit() {
    this.load = true;
    this.playerComplete = Boolean(sessionStorage.getItem('playerComplete'));
    this.reward = localStorage.getItem('rewardpoint');
    this.checkPlayerComplete();
    
  }

  openPage() {
    this.open = true;
    this.router.navigateByUrl('/reward_flip');
  }

  checkPlayerComplete() {
    if (this.playerComplete !== true) {
      this.reward = localStorage.getItem('rewardpoint');
      this.mobileId = sessionStorage.getItem('mobileId');
      this.playId = sessionStorage.getItem('playId');
      // this.servedPlayReward(this.mobileId, this.playId);
    }
  }

  servedPlayReward(mobileId, playId) {
    this.gameService.getReward(mobileId, playId).subscribe(res => {
      if (res["resultCode"] === "20000" && res["data"].status === "20000" && res["data"].description === "SUCCESS") {
        // sessionStorage.removeItem("playId");
        this.load = false;
      }
    });
  }

}
