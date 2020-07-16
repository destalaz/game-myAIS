import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from "../service/cms.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-cms-config',
  templateUrl: './cms-config.component.html',
  styleUrls: ['./cms-config.component.scss']
})
export class CmsConfigComponent implements OnInit {
  configForm: FormGroup;
  submitted = false;
  difficulty = ""
  fipAmtOptionList = [];
  configData: any;
  diffDetail: any;
  diffTb: any;
  title = 'Game-myAIS';

  btnRewardLimit: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private cmsService: CmsService,
    private router: Router,
  ) { }

  ngOnInit() {

    for (let i = 1; i <= 50; i++) { this.fipAmtOptionList.push(i) }
    this.configForm = this.formBuilder.group({
      levelIdx: [1, [Validators.required]],
      pointIdx: ['', [Validators.required]],
      point: ['', []],
      rewardIdx: ['', [Validators.required]],
      reward: ['', []],
      amountWin: ['', [Validators.required]],
      playerAmt: ['', [Validators.required]],
      winnerAmt: ['', [Validators.required]],
      _id: '',
      level: ''
    })
    this.getConfig();
  }

  get f() { return this.configForm.controls; }



  amountWinOnChange() {
    // console.log(this.configForm.controls.amountWin.value.toString());
    // console.log(this.diffDetail.length);
    if (this.configForm.controls.amountWin.value != this.diffDetail.length) {
      this.diffDetail = [];
      for (let i = 1; i <= this.configForm.controls.amountWin.value; i++) {
        const diffArr = { "flip": + i, "speed": 200, "flipAmt": 1 };
        this.diffDetail.push(diffArr);
      }
    }
  }

  diffConvert() {
    let diffArr = [];
    for (let i = 0; i < this.diffDetail.length; i++) {
      const fmSet = {
        "flip": Number(this.diffDetail[i].flip),
        "speed": Number(this.diffDetail[i].speed),
        "flipAmt": Number(this.diffDetail[i].flipAmt),
      };
      diffArr.push(fmSet)

    }
    this.diffDetail = diffArr;
    // console.log("=> ", this.diffDetail);
  }

  levelOnChange(vLevelId: string, modal: string) {

    if (modal === "set") {
      let element: HTMLInputElement = document.getElementById('modalEdit') as HTMLInputElement;
      element.style.display = "block";
      element.click();
    } else if (modal === "diff") {
      let elemen2: HTMLInputElement = document.getElementById('modalDeff') as HTMLInputElement;
      elemen2.style.display = "block";
      elemen2.click();
    }
    for (let i in this.configData) {
      // if (this.configForm.controls.levelIdx.value.toString() === this.configData[i].levelIdx.toString()) {
      if (vLevelId.toString() === this.configData[i].levelIdx.toString()) {
        this.configForm = this.formBuilder.group({
          levelIdx: [this.configData[i].levelIdx, [Validators.required]],
          pointIdx: [this.configData[i].pointIdx, [Validators.required]],
          rewardIdx: [this.configData[i].rewardIdx, [Validators.required]],
          amountWin: [this.configData[i].amountWin, [Validators.required]],
          playerAmt: [this.configData[i].playerAmt, [Validators.required]],
          winnerAmt: [this.configData[i].winnerAmt, [Validators.required]],
          _id: [this.configData[i]._id, []],
          level: this.configData[i].level,
        });
        this.diffDetail = this.configData[i].difficulty;
        this.difficulty = this.configData[i].level;
        return;
      }
    }

  }

  getConfig() {
    this.alertLoading(true);
    this.cmsService.getConfig().subscribe((res: any) => {
      if (res.resultCode === "20000") {
        this.configData = res.data;
        if (res.rewardLimit === 0) {
          this.btnRewardLimit = true;
        } else {
          this.btnRewardLimit = false;
        }
        // this.levelOnChange();
      }
      // Err
      setTimeout(() => {
        this.alertLoading(false);
      }, 1000);

    });


  }

  alertLoading(val: boolean): void {
    if (val === true) {
      let element: HTMLInputElement = document.getElementById('modalLoading') as HTMLInputElement;
      element.style.display = "block";
      element.click();
    } else if (val === false) {
      let element: HTMLInputElement = document.getElementById('closeModalLoading') as HTMLInputElement;
      element.style.display = "none";
      element.click();
    }
  }

  save() {
    this.submitted = true;
    this.alertLoading(true);
    const data =
    {
      levelIdx: Number(this.configForm.controls.levelIdx.value),
      level: this.configForm.controls.level.value.toString(),
      pointIdx: Number(this.configForm.controls.pointIdx.value),
      rewardIdx: Number(this.configForm.controls.rewardIdx.value),
      amountWin: Number(this.configForm.controls.amountWin.value),
      // playerAmt: this.configForm.controls.playerAmt.value.toString(),
      // winnerAmt: this.configForm.controls.winnerAmt.value.toString(),
      difficulty: this.diffDetail

    };
    // console.log("===> ", JSON.stringify(data))
    this.cmsService.createLevel(data).subscribe(
      (res: any) => {
        if (res.resultCode === "20000") {
          setTimeout(() => {
            this.getConfig();
            let element: HTMLInputElement = document.getElementById('closeModalEdit') as HTMLInputElement;
            element.style.display = "none";
            element.click();
            let element2: HTMLInputElement = document.getElementById('closeModalDeff') as HTMLInputElement;
            element2.style.display = "none";
            element2.click();
            this.submitted = false;
          }, 1500);
        }

      });

    // Err

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  pageReport () {
    this.router.navigate(['/report']);
  }


  changeRewardLimite() {
    this.alertLoading(true);
    var _data = 0
    if (this.btnRewardLimit === true) { _data = 3; this.btnRewardLimit = false } 
    else { this.btnRewardLimit = true  }
    this.cmsService.rewardLimit(_data).subscribe(
      (res: any) => {
        if (res.resultCode === "20000") {
          setTimeout(() => {
            this.alertLoading(false)
          }, 1000);
        }
      });

  }

}
