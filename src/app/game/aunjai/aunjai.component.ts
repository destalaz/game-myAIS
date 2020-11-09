import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import 'rxjs';
import { async } from '@angular/core/testing';
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
  ansVal: any;
  load: boolean = false;
  isConnected: boolean = true;
  winShow: boolean = false;
  loseShow: boolean = false;
  statusApi: boolean = false;
  playId: string;
  cclick = localStorage.getItem('sumcclick');


  ngOnInit() {
    this.loadScript();
    localStorage.setItem("gameOver", "false");
    this.loadOptionGame();
  }

  addChar(val) {
    val = val.toString().substring(0, 10) + 'EUIRUTOOPD';
    return val.toString().substring(0, 10);
  };

  constructor(private router: ActivatedRoute, private gameService: GameService, private route: Router, private connectionService: ConnectionService) {
  }



  servedPlayResult() {
    if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
      this.winShow = true;
    } else if (localStorage.getItem('gameOver') === "true") {
      this.loseShow = true;
    }
  }



  resultGame() {
    this.load = true;
    setTimeout(() => {
      this.load = false;
      this.ansVal = localStorage.getItem('sumcclick');
      this.servedPlayResult();
    }, 1000);
  }



  public loadOptionGame() {
    this.subscriptions.add(this.optionGame
      .subscribe(params => {
        this.dataParams = params;
        this.langauge = this.dataParams.langauge;
      }))
  }

  public loadScript() {
    let node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}



