import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/service/game.service';
@Component({
  selector: 'game-aunjai',
  templateUrl: './aunjai.component.html',
  styleUrls: ['./aunjai.component.scss']
})
export class AunjaiComponent implements OnInit {
  url = '../../../assets/aunjaiAssets/js/script.js';
 
  ngOnInit() {
    this.loadScript();
  }

  mobileId: string;
  playId: string
  winnerStatus: boolean
  load: boolean;

  constructor(private router: Router ,  private gameService: GameService ) { 
    this.load = false;
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

  ngOnDestroy() {
    localStorage.removeItem('firstLoad');
    console.log('Service destroy')
  }

  checkOverGame() {
    if( localStorage.getItem("gameOver") === "true"){
      localStorage.removeItem("gameOver");
      this.load = true;
      this.mobileId = sessionStorage.getItem('mobileId');
      this.playId = sessionStorage.getItem('playId');
      this.winnerStatus = false;
      this.servedPlayResult(this.mobileId, this.playId, this.winnerStatus);
    }

  }
  
  servedPlayResult(mobileId, playId, winnerStatus) {
    this.gameService.getPlayResult(mobileId, playId, winnerStatus).subscribe(res => {
      if (res["resultCode"] === "20000" && res["status"] === true) {
        sessionStorage.removeItem("playId");
        this.load = false;
      }
    });
  }


}
