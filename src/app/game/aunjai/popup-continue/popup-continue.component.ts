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
  constructor(private gameService: GameService) { }


  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
    console.log(this.reward);
    this.gameService.getPlayResult(sessionStorage.getItem('mobileId'), localStorage.getItem('playId'), true).subscribe(res => {
      console.log("res winner  => ", res);
    });
  }
  openPage() {
    this.open = true;
  }

}
