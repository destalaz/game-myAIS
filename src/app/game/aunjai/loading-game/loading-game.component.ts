import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'loading-game',
  templateUrl: './loading-game.component.html',
  styleUrls: ['./loading-game.component.scss'],
  animations: [
    trigger('FadeAnimation', [
      state('in', style({ opacity: 0.93, display: 'none' })),
      transition(':enter', [
        style({ opacity: 1 }),
        animate(5000)
      ])
    ])
  ]
})
export class LoadingGameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
