import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';
@Component({
  selector: 'popup-win',
  templateUrl: './popup-win.component.html',
  styleUrls: ['./popup-win.component.scss']
})
export class PopupWinComponent implements OnInit {
  reward: any;
  btnClick: boolean = false;
  @Input() langauge: any;
  @Input() winShow: boolean;
  statusLoad: boolean = false;
  isConnected: boolean = true;
  constructor(private gameService: GameService, private router: Router) {
    this.reward = localStorage.getItem('rewardpoint');


  }

  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
  }

  servedPlayReward() {
    this.statusLoad = true;
    setTimeout(() => {
        localStorage.removeItem('resumeGame');
        localStorage.removeItem('rewardpoint');
     
      this.statusLoad = false;
      this.router.navigate(["popupContinue"], { queryParams: { langauge: this.langauge } });
    }, 2000);
  }

}
