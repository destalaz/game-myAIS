import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  dataParams:any;
  langauge:string;
  private optionGame = this.router.queryParams;
  private subscriptions = new Subscription();
  playComplete:boolean;
  constructor(private gameService: GameService ,   private router: ActivatedRoute,private route:Router) {
    this.load = false;
    this.reward = ""

  }


  ngOnInit() {
    this.load = true;
    this.playerComplete = false;
    this.loadOptionGame();
    if (sessionStorage.getItem('playerComplete') === "true" ) { this.playerComplete = true }
    // this.playerComplete = sessionStorage.getItem('playerComplete');
    this.reward = localStorage.getItem('rewardpoint');
    console.log(this.reward);
    this.checkPlayerComplete();
    
  }

  public loadOptionGame() {
    this.subscriptions.add(this.optionGame
      .subscribe(params => {
        this.dataParams = params;
        this.langauge = this.dataParams.langauge;
      }))
      console.log(this.dataParams);
    console.log(this.langauge);
  }


  openPage() {
    this.route.navigateByUrl('/reward_flip');
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
