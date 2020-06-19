import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cms-config',
  templateUrl: './cms-config.component.html',
  styleUrls: ['./cms-config.component.scss']
})
export class CmsConfigComponent implements OnInit {
  configForm: FormGroup;
  submitted = false;
  difficulty = "easy"

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configForm = this.formBuilder.group({
      level: ['', [Validators.required]],
      point: ['', [Validators.required]],
      reward: ['', [Validators.required]],
      amountWin: ['', [Validators.required]],
      playerAmt: ['', [Validators.required]],
      winnerAmt: ['', [Validators.required]],
    });
  }

  get f() { return this.configForm.controls; }

  config() {
    this.submitted = true;
    if (this.configForm.invalid) { return; }


  }

}
