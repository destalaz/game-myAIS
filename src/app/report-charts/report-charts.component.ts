import { Component, OnInit } from '@angular/core';
// import * as CanvasJS from '../../../node_modules/canvasjs';
// var CanvasJS = require('./canvasjs.min');
import * as CanvasJS from './canvasjs.min';
@Component({
  selector: 'app-report-charts',
  templateUrl: './report-charts.component.html',
  styleUrls: ['./report-charts.component.scss'],

})
export class ReportChartsComponent {
  ngOnInit() {
  
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Report all game play"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 450, name: "Level1 lose" },
          { y: 120, name: "Level2 lose" },
          { y: 300, name: "Level3 lose" },
          { y: 800, name: "Level1 win" },
          { y: 150, name: "Level2 win" },
          { y: 150, name: "Level3 win" },
          { y: 250, name: "Others" }
        ]
      }]
    });

        let chart2 = new CanvasJS.Chart("chartContainer2",{
			theme: "light2", // "light2", "dark1", "dark2"
      title: {
        text: "Award results"
      },
      data: [
        {
          type: "column", // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: [
            { label: "Level1", y: 10 },
            { label: "Level2", y: 15 },
            { label: "Level3", y: 25 }
          ]
        }
      ]
    });
    

    chart.render();
    chart2.render();

    
  };







}