import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { DetailService } from '../../service/detail.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'game-aunjai',
  templateUrl: './aunjai.component.html',
  styleUrls: ['./aunjai.component.scss']
})
export class AunjaiComponent implements OnInit {
  url = '../../../assets/aunjaiAssets/js/script.js';
  private subscriptions = new Subscription();
  private optionGame = this.router.queryParams;
  dataParams: any;
  langauge: string;
  ngOnInit() {
    this.loadScript();
    console.log(this.detailService.fnGetlanguge());
    localStorage.setItem("gameOver", "false");
    console.log("language", this.langauge);
    this.loadOptionGame();

  }

  mobileId: string;
  playId: string

  load: boolean;

  constructor(private router: ActivatedRoute, private gameService: GameService, private detailService: DetailService) {
    this.load = false;
    this.mobileId = sessionStorage.getItem('mobileId');
    this.playId = sessionStorage.getItem('playId');
  }

  public loadOptionGame() {
    this.subscriptions.add(this.optionGame
      .subscribe(params => {
        this.dataParams = params;
        this.langauge = this.dataParams.langauge;
      }))
    console.log(this.langauge);
  }
  public loadScript() {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  servedPlayResult(mobileId, playId, winnerStatus) {
    this.gameService.getPlayResult(mobileId, playId, winnerStatus).subscribe(res => {
      if (res["resultCode"] === "20000" && res["status"] === true) {
        if (winnerStatus.toString() === "false") {
          sessionStorage.removeItem('playId')
        }
        this.load = false;
      }
    });
  }


  resultGame(statusGame) {
    this.load = true;
    console.log("Boolean(statusGame) => ", statusGame)
    this.servedPlayResult(this.mobileId, this.playId, statusGame);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
}

}


