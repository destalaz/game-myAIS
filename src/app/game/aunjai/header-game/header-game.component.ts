import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-game',
  templateUrl: './header-game.component.html',
  styleUrls: ['./header-game.component.scss']
})
export class HeaderGameComponent implements OnInit {

  totalRound: any;
 
  constructor() { }

  ngOnInit() {
    this.totalRound = parseInt(localStorage.getItem('totalRound'));
    console.log("total",this.totalRound)
  }
}
