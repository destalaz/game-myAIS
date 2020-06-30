import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-reward-flip',
  templateUrl: './reward-flip.component.html',
  styleUrls: ['./reward-flip.component.scss']
})
export class RewardFlipComponent implements OnInit {
  constructor( private gameService: GameService,private router: Router) { }
  // level: any;
  open: boolean = false;
  ngOnInit() {
    localStorage.setItem('countWin', "1");
  }
  termUrl="myais://gamesterms?lang=th&url=https%3A%2F%2Fais.co.th%2Fgames%2Freawrdsflip%2Fconditions%2Fth";
  // goPlaces() {
  //   this.router.navigateByUrl('/popupError');
  // }


  chooseLevel(level) {
   this.open = true;
    // this.errorState = true;
  }
  easy() {

    localStorage.setItem('totalRound', "3");
    localStorage.setItem('speed', "500");
    localStorage.setItem('shuffle', "25");
    localStorage.setItem('aispoint', "1");
    localStorage.setItem('rewardpoint', "20");
    console.log("easy");

    // this.router.navigateByUrl('/popupError');
  }
  normol() {
    localStorage.setItem('totalRound', "4");
    localStorage.setItem('speed', "400");
    localStorage.setItem('shuffle', "20");
    localStorage.setItem('aispoint', "2");
    localStorage.setItem('rewardpoint', "50");
    console.log("normal");
    // this.router.navigateByUrl('/popupError');
  }

  hard() {
    localStorage.setItem('totalRound', "5");
    localStorage.setItem('speed', "300");
    localStorage.setItem('shuffle', "15");
    localStorage.setItem('aispoint', "3");
    localStorage.setItem('rewardpoint', "100");
    console.log("hard");
    // localStorage.getItem('speed');
    // this.router.navigateByUrl('/popupError');
  }

  termCondition(){
    window.open(this.termUrl, "_blank");
  }

  ServedPlayGame(level) {
    this.gameService.getPlayDetails(sessionStorage.getItem('mobileId'), Number(level)).subscribe(res => {
      sessionStorage.setItem('playId',res["playData"].playId);

      console.log("res playData => ",  res["playData"].playerDetall);
      console.log("res playId => ",  res["playData"].playId);
    });
  }


}
