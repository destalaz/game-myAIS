import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-tutorial-page-eng',
  templateUrl: './tutorial-page-eng.component.html',
  styleUrls: ['./tutorial-page-eng.component.scss']
})
export class TutorialPageEngComponent implements OnInit {

  @Input() goTutorialPage: boolean;
  pageNo: number = 0;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
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
