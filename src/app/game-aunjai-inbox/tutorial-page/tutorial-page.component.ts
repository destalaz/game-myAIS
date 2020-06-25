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
  }

  nextPage() {

    for (let i = 0; i <= 4; i++) {
      if (this.pageNo === 0) {
        this.pageNo = this.pageNo + 1;
        i++;
        console.log('ก่อน => ', this.pageNo);
        console.log('i => ', i);

      } else {
        if (((this.pageNo === i) && (i === 1) && (this.pageNo) === 1)) {
          this.pageNo = this.pageNo + 1;
          i++;
          console.log('pageNo => ', this.pageNo);
          console.log('i => ', i);

        } else if ((this.pageNo === i) && (i === 2) && (this.pageNo) === 2) {
          this.pageNo = this.pageNo + 1;
          i++;
          console.log('pageNo => ', this.pageNo);
          console.log('i => ', i);

        } else if ((this.pageNo === i) && (i === 3) && (this.pageNo) === 3) {
          this.pageNo = this.pageNo + 1;
          i++;
          console.log('pageNo => ', this.pageNo);
          console.log('i => ', i);
        } else if ((this.pageNo === i) && (i === 4) && (this.pageNo) === 4) {
          this.pageNo = this.pageNo + 1;
          i++;
          console.log('pageNo => ', this.pageNo);
          console.log('i => ', i);
        }
      }
    }
  }
}
