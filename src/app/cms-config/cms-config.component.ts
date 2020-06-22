import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConfigBDService } from '../service/apiConfigDB.service';

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
  difficulty = "easy"
  headers: string[];
  data: any[];
  rewardOptionList = [1];
  
  

  constructor(
    private formBuilder: FormBuilder , 
    private apiConfigBDService: ApiConfigBDService
  ) {}

  ngOnInit() {

     this.createJSONFile();

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

createJSONFile() {
  // var sampleObject = {
  //     a: 1,
  //     b: 2,
  //     c: {
  //         x: 11,
  //         y: 22
  //     }
  // };
  
  // fs.writeFile("./object.json", JSON.stringify(sampleObject, null, 4), (err) => {
  //     if (err) {
  //         console.error(err);
  //         return;
  //     };
  //     console.log("File has been created");
  // });



  // fs.writeFile('path/test.txt', 'aaa', function(err) {})


  var obj = {
    table: []
 };
 obj.table.push({id: 1, square:2});
 var json = JSON.stringify(obj);
//  var fs = require('fs');
fs.writeFile('myjsonfile.json', json, 'utf8');
fs.readFile('/myjsonfile.json', 'utf8', function readFileCallback(err, data){
  if (err){
      console.log(err);
  } else {
  obj = JSON.parse(data); //now it an object
  obj.table.push({id: 2, square:3}); //add some data
  json = JSON.stringify(obj); //convert it back to json
  fs.writeFile('myjsonfile.json', json, 'utf8'); // write it back 
}});

}


  
}
