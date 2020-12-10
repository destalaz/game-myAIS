import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../service/game.service';

@Component({
  selector: 'header-game',
  templateUrl: './header-game.component.html',
  styleUrls: ['./header-game.component.scss']
})
export class HeaderGameComponent implements OnInit {
  server: string = '';
  totalRound: number;

  constructor(private gameService: GameService) {
    this.server = this.gameService.server;
  }

  ngOnInit() {
    this.totalRound = parseInt(localStorage.getItem('totalRound'));
  }
}
