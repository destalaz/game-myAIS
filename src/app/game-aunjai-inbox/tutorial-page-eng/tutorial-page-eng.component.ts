import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutorial-page-eng',
  templateUrl: './tutorial-page-eng.component.html',
  styleUrls: ['./tutorial-page-eng.component.scss']
})
export class TutorialPageEngComponent implements OnInit {

  @Input() goTutorialPage: boolean;
  pageNo: number = 0;
  langauge: string;
  firstPlay: boolean;

  constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.langauge = params.langauge,
      this.firstPlay = params.firstplay

      // console.log(this.langauge);
      // console.log(this.firstPlay);
    })
  }

  checkStatusRead() {
    this.goTutorialPage = false;
  }

  backPage() {
    this.pageNo = this.pageNo - 1;
  }

  nextPage() {
    this.pageNo = this.pageNo + 1;
  }

}
