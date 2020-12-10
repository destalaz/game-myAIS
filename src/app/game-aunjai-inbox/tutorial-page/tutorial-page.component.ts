import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.scss']
})
export class TutorialPageComponent implements OnInit {

  @Input() goTutorialPage: boolean;
  @Output() close_tutorial = new EventEmitter();
  pageNo: number = 0;
  language: string;
  firstPlay: boolean;
  server: string = '';

  constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.server = this.gameService.server;
  }

  ngOnInit() {
    this.pageNo = 0;
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.language = params.language,
    //   this.firstPlay = params.firstplay
    //   // console.log(this.language);
    //   // console.log(this.firstPlay);
    // })
  }


  close_popup() {
    this.goTutorialPage = false;
    this.close_tutorial.emit(this.goTutorialPage);
  }

  backPage() {
    this.pageNo = this.pageNo - 1;

  }

  nextPage() {
    this.pageNo = this.pageNo + 1;
  }
}
