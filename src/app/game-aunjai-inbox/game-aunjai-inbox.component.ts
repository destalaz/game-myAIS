import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-aunjai-inbox',
  templateUrl: './game-aunjai-inbox.component.html',
  styleUrls: ['./game-aunjai-inbox.component.scss']
})
export class GameAunjaiInboxComponent implements OnInit {

  public goNext: boolean = false;
  public loading: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

  btnGoNext() {

  }

}
