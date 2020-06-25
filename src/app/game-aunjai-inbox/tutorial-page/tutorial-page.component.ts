import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.scss']
})
export class TutorialPageComponent implements OnInit {

  pageNo: number = 0;

  constructor() { }

  ngOnInit() {
  }

  backPage() {
    this.pageNo = this.pageNo - 1;
  }

  nextPage() {
    this.pageNo = this.pageNo + 1;
  }
}
