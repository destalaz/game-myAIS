import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from 'src/app/service/google-analytics.service';
@Component({
  selector: 'popup-win',
  templateUrl: './popup-win.component.html',
  styleUrls: ['./popup-win.component.scss']
})
export class PopupWinComponent implements OnInit {
  reward: any;
  btnClick: boolean = false;
  @Input() language: any;
  @Input() winShow: boolean;
  statusLoad: boolean = false;
  isConnected: boolean = true;
  constructor(private gameService: GameService, private router: Router,private _ga: GoogleAnalyticsService) {
    this.reward = localStorage.getItem('rewardpoint');


  }

  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
  }

  getReward() {
    this.statusLoad = true;

   this.gameService.getReward().subscribe(
    data => {
     if(data["statusCode"] ==20000){
      this.statusLoad = false;
      this._ga.eventEmitter("getAward", "success", data["statusCode"], localStorage.getItem('o_decode'));
      this.router.navigate(["popupContinue"], { queryParams: { language: this.language,playcomplete:data.playcomplete } });
     }else if(data["statusCode"] == 'F:25001') {
      this._ga.eventEmitter("getAward", "success", data["statusCode"], localStorage.getItem('o_decode'));
      this.statusLoad = false;
      this.router.navigate(["popupContinue"], { queryParams: { language: this.language,playcomplete:data.playcomplete } });
     }
    },
    error => {
      this._ga.eventEmitter("getAward", "failed", error, localStorage.getItem('o_decode'));
      console.log(error);
      // this.statusLoad = false;
    });
  }

}
