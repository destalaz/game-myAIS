import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConfigBDService } from '../service/apiConfigDB.service';

import { CmsService } from "../service/cms.service";


@Component({
  selector: 'app-cms-config',
  templateUrl: './cms-config.component.html',
  styleUrls: ['./cms-config.component.scss']
})
export class CmsConfigComponent implements OnInit {
  configForm: FormGroup;
  submitted = false;
  difficulty = ""
  rewardOptionList = [1];
  fipAmtOptionList = [];
  configData: any;
  diffDetail: any;
  diffTb: any; 

  constructor(
    private formBuilder: FormBuilder,
    private cmsService: CmsService,
    private apiConfigBDService: ApiConfigBDService
  ) { }

  ngOnInit() {

    for (let i = 10; i <= 300; i = i + 10) { this.rewardOptionList.push(i) }
    for (let i = 1; i <= 50; i++) { this.fipAmtOptionList.push(i) }
    this.configForm = this.formBuilder.group({
      levelIdx: [1, [Validators.required]],
      point: ['', [Validators.required]],
      reward: ['', [Validators.required]],
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
    console.log(this.configForm.controls.amountWin.value.toString());
    console.log(this.diffDetail.length);
    if (this.configForm.controls.amountWin.value != this.diffDetail.length) {
      this.diffDetail = [];
      for (let i = 1; i <= this.configForm.controls.amountWin.value; i++) {
        const diffArr = { "flip": i, "speed": 1, "flipAmt": 1 };
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
          point: [this.configData[i].point, [Validators.required]],
          reward: [this.configData[i].reward, [Validators.required]],
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
        // this.levelOnChange();
      }
      // Err
      this.alertLoading(false);
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
    this.alertLoading(true);
    const data =
    {
      levelIdx: this.configForm.controls.levelIdx.value.toString(),
      level: this.configForm.controls.level.value.toString(),
      point: this.configForm.controls.point.value.toString(),
      reward: this.configForm.controls.reward.value.toString(),
      amountWin: this.configForm.controls.amountWin.value.toString(),
      playerAmt: this.configForm.controls.playerAmt.value.toString(),
      winnerAmt: this.configForm.controls.winnerAmt.value.toString(),
      difficulty: this.diffDetail

    };

    this.cmsService.cancelLevel(this.configForm.controls._id.value.toString())
      .subscribe((res: any) => {
        if (res.resultCode === "20000") {
          this.cmsService.createLevel(data).subscribe(
            (res: any) => {
              this.getConfig();
            });
        }
        // Err

        this.alertLoading(false);
        let element: HTMLInputElement = document.getElementById('closeModalEdit') as HTMLInputElement;
        element.style.display = "none";
        element.click();
        let element2: HTMLInputElement = document.getElementById('closeModalDeff') as HTMLInputElement;
        element2.style.display = "none";
        element2.click();
      });




  }


}
