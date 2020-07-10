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
  reward: string;
  load: boolean;
  mobileId: string;
  playId: string
  winnerStatus: boolean
  playerComplete: boolean;
  dataParams: any;
  langauge: string;
  private optionGame = this.router.queryParams;
  private subscriptions = new Subscription();
  playComplete: boolean;
  constructor(private gameService: GameService, private router: ActivatedRoute, private route: Router) {
    this.load = false;}


  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
    this.load = true;
    this.playerComplete = false;
    this.loadOptionGame();
    if (sessionStorage.getItem('playerComplete') === "true") { this.playerComplete = true }
    this.checkPlayerComplete();
  }

  public loadOptionGame() {
    this.subscriptions.add(this.optionGame
      .subscribe(params => {
        this.dataParams = params;
        this.langauge = this.dataParams.langauge;
        this.playerComplete = this.dataParams.playerComplete;
        if (this.playerComplete) {
          localStorage.removeItem('resumeGame');
        }
      }))
  }

  openPage() {
    localStorage.setItem('resumeGame', 'true');
    if (this.langauge === 'TH') {
      this.route.navigate(["reward_flip"], { queryParams: { langauge: "TH", openPage: true } });
    } else {
      this.route.navigate(["reward_flip_eng"], { queryParams: { langauge: "ENG", openPage: true } });
    }
  }



  checkPlayerComplete() {
    if (this.playerComplete !== true) {
      // this.gameService.getMobileId(token).subscribe((res) => {
      this.reward = localStorage.getItem('rewardpoint');
      this.mobileId = sessionStorage.getItem('mobileId');
      this.playId = sessionStorage.getItem('playId');
      localStorage.setItem('resumeGame', 'true');
    } else {
      this.reward = '';
    }
  }

}