import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.scss']
})
export class TutorialPageComponent implements OnInit {

  @Input() goTutorialPage: boolean;

  pageNo: number = 0;
  

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

  checkStatusRead() {
    this.goTutorialPage = false;
    console.log('checkStatusRead => ',this.goTutorialPage);
  }

  backPage() {
    this.pageNo = this.pageNo - 1;
  }

  nextPage() {
    this.pageNo = this.pageNo + 1;
  }
}
