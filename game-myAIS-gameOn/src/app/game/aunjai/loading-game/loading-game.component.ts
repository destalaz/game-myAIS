import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'loading-game',
  templateUrl: './loading-game.component.html',
  styleUrls: ['./loading-game.component.scss'],
  animations: [
    trigger('FadeOutAnimation', [
      state('in', style({ opacity: 0.5, display: 'none' })),
      transition(':enter', [
        style({ opacity: 1 }),
        animate(4000)
      ])
    ]),
    trigger('FadeInAnimation', [
      state('out', style({ opacity: 1, })),
      transition(':enter', [
        style({ opacity: 0,display: 'none' }),
        animate(4001)
      ])
    ])
  ]
})
export class LoadingGameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
