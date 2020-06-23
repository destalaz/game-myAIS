import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConfigBDService } from '../service/apiConfigDB.service';

import { CmsService } from "../service/cms.service";

import * as fs from 'file-system';
// import * as fs from 'fs' 


@Component({
  selector: 'app-cms-config',
  templateUrl: './cms-config.component.html',
  styleUrls: ['./cms-config.component.scss']
})
export class CmsConfigComponent implements OnInit {
  configForm: FormGroup;
  submitted = false;
  difficulty = ""
  headers: string[];
  data: any[];
  rewardOptionList = [1];
  fipAmtOptionList = [];
  configData: any;
  diffDetail: any;

  constructor(
    private formBuilder: FormBuilder,
    private cmsService: CmsService,
    private apiConfigBDService: ApiConfigBDService
  ) { }

  ngOnInit() {

    //  this.createJSONFile();


    for (let i = 10; i <= 300; i = i + 10) { this.rewardOptionList.push(i) }
    for (let i = 1; i <= 50; i++) { this.fipAmtOptionList.push(i) }

    this.configForm = this.formBuilder.group({
      levelIdx: [1, [Validators.required]],
      point: ['', [Validators.required]],
      reward: ['', [Validators.required]],
      amountWin: ['', [Validators.required]],
      playerAmt: ['', [Validators.required]],
      winnerAmt: ['', [Validators.required]],
      _id: ''
    });

    this.headers = ['Flip', 'Speed(0-10)', 'fip Amount'];
    this.data = [
      { "flip": "1", "speed": "2", "flp": "4" },
      { "flip": "2", "speed": "4", "flp": "6" },
      { "flip": "3", "speed": "6", "flp": "7" }
    ]

    this.getConfig();


  }

  get f() { return this.configForm.controls; }

  config() {
    this.submitted = true;
    if (this.configForm.invalid) { return; }
  }

  levelOnChange() {
    // loop diffDetail

    for (let i in this.configData) {
      if ( this.configForm.controls.levelIdx.value.toString() ===  this.configData[i].levelIdx.toString() ) {
        this.configForm = this.formBuilder.group({
          levelIdx: [this.configData[i].levelIdx, [Validators.required]],
          point: [this.configData[i].point, [Validators.required]],
          reward: [this.configData[i].reward, [Validators.required]],
          amountWin: [this.configData[i].amountWin, [Validators.required]],
          playerAmt: [this.configData[i].playerAmt, [Validators.required]],
          winnerAmt: [this.configData[i].winnerAmt, [Validators.required]],
          _id: [this.configData[i]._id , []], 
        });
        console.log(this.configForm.controls._id.value.toString() )
        return;
      }
    }

  }

  getConfig() {
    this.alertLoading(true);
    // const configObj = this.apiConfigBDService.getConfig();
    this.cmsService.getConfig().subscribe((res: any) => {
      if (res.resultCode === "20000") {
        this.configData = res.data;
        this.levelOnChange();
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


}
