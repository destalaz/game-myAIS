import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConfigBDService } from '../service/apiConfigDB.service';

@Component({
  selector: 'app-cms-config',
  templateUrl: './cms-config.component.html',
  styleUrls: ['./cms-config.component.scss']
})
export class CmsConfigComponent implements OnInit {
  configForm: FormGroup;
  submitted = false;
  difficulty = "easy"
  headers: string[];
  data: any[];
  rewardOptionList = [1];
  

  constructor(
    private formBuilder: FormBuilder , 
    private apiConfigBDService: ApiConfigBDService
  ) {}

  ngOnInit() {

    for(let i = 10; i <= 300 ; i = i + 10){ this.rewardOptionList.push(i) }
    
    this.configForm = this.formBuilder.group({
      level: [1, [Validators.required]],
      point: ['', [Validators.required]],
      reward: ['', [Validators.required]],
      amountWin: ['', [Validators.required]],
      playerAmt: ['', [Validators.required]],
      winnerAmt: ['', [Validators.required]],
    });

    this.headers = ['Flip', 'Speed(0-10)', 'fip Amount'];
    this.data = [ 
      {"flip" : "1" , "speed":"2","flp":"4" }  ,
      {"flip" : "2" , "speed":"4","flp":"6" } , 
      {"flip" : "3" , "speed":"6","flp":"7" } 
  ]

  this.getConfig();
  }

  get f() { return this.configForm.controls; }

  config() {
    this.submitted = true;
    if (this.configForm.invalid) { return; }
  }

  levelOnChange() {
    this.getConfig()
  }

  getConfig() {
    const configObj = this.apiConfigBDService.getConfig() ;

    for (let configArr of configObj) {
      if ( this.configForm.controls.level.value.toString() ===  configArr.levelIdx.toString() ) {
        this.configForm = this.formBuilder.group({
          level: [configArr.levelIdx, [Validators.required]],
          point: [configArr.point, [Validators.required]],
          reward: [configArr.reward, [Validators.required]],
          amountWin: [configArr.amountWin, [Validators.required]],
          playerAmt: [configArr.playerAmt, [Validators.required]],
          winnerAmt: [configArr.winnerAmt, [Validators.required]],
        });
        return ;
      }

      // console.log(this.configForm.value); 
  }
}


  
}
