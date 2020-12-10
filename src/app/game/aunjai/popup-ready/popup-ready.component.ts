import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'popup-ready',
  templateUrl: './popup-ready.component.html',
  styleUrls: ['./popup-ready.component.scss']
})
export class PopupReadyComponent implements OnInit {
  @Input() language:string='';
  round: string='1';
  server: string = '';
  // this.dataGame
  constructor(private router: Router, private gameService: GameService) {
    this.server = this.gameService.server;
  }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(["aunjai"+this.round], { queryParams: { language: this.language} });
    }, 2000);
  }

}
