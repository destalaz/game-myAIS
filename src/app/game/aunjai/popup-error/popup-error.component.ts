import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'popup-error',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.scss']
})
export class PopupErrorComponent implements OnInit {
  @Input() redeem_point: boolean;
  aispoint: any;
  statusLoad: boolean;
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.aispoint = localStorage.getItem('aispoint');
    this.statusLoad = false;
  }

  ServedPlayGame() {
    this.statusLoad = true;
    const level = localStorage.getItem("level");
    if (!level) { return }



    this.gameService.getPlayDetails(sessionStorage.getItem('mobileId'), Number(level)).subscribe(res => {
      sessionStorage.setItem('playId', res["playData"].playId);
      console.log("res playData => ", res["playData"].playerDetall);
      console.log("res playId => ", res["playData"].playId);


      localStorage.setItem('countWin', "1");
      localStorage.setItem('config', JSON.stringify(res["playData"].playerDetall));
      localStorage.setItem('totalRound', JSON.parse(localStorage.getItem('config')).length);

      this.router.navigateByUrl('/popupReady');
    });

    // localStorage.removeItem("level")
  }

}
