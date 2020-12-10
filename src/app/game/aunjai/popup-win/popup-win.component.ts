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
  @Input() language: any;
  @Input() winShow: boolean;
  statusLoad: boolean = false;
  isConnected: boolean = true;
  constructor(private gameService: GameService, private router: Router) {
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
      this.router.navigate(["popupContinue"], { queryParams: { language: this.language,playcomplete:data.playcomplete } });
     }else if(data["statusCode"] == 'F:25001') {
      this.statusLoad = false;
      this.router.navigate(["popupContinue"], { queryParams: { language: this.language,playcomplete:data.playcomplete } });
     }
    },
    error => {
      console.log(error);
      // this.statusLoad = false;
    });
  }

}
