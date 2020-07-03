import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';
@Component({
  selector: 'popup-win',
  templateUrl: './popup-win.component.html',
  styleUrls: ['./popup-win.component.scss']
})
export class PopupWinComponent implements OnInit {
  open: boolean = false;
  reward: any;
  @Input() langauge:any;
  load: boolean;
  constructor(private gameService: GameService, private router: Router) {
    this.load = false;
    this.reward = localStorage.getItem('rewardpoint');
  }



  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
  }
  openPage() {
    this.open = true;
  }
  // this.playerComplete = Boolean(sessionStorage.getItem('playerComplete'));

  servedPlayReward() {
    this.load = true;;
    var mobileId = sessionStorage.getItem('mobileId');
    var playId = sessionStorage.getItem('playId');

    this.gameService.getReward(mobileId, playId).subscribe(res => {
      if (res["resultCode"] === "20000" && res["data"].status === "20000" && res["data"].description === "SUCCESS") {
        sessionStorage.removeItem("playId");
        if (res["playerComplete"] === true) {
          sessionStorage.setItem('playerComplete', 'true')
        }
        else { 
        sessionStorage.setItem('playerComplete', 'false') }
        this.load = false;
        this.router.navigateByUrl('/popupContinue');
      }
    });
  }

}
