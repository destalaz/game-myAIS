import { Component, OnInit } from '@angular/core';
// import * as CanvasJS from '../../../node_modules/canvasjs';
// var CanvasJS = require('./canvasjs.min');
import * as CanvasJS from './canvasjs.min';
import { CmsService } from '../service/cms.service';
@Component({
  selector: 'app-report-charts',
  templateUrl: './report-charts.component.html',
  styleUrls: ['./report-charts.component.scss'],

})
export class ReportChartsComponent {

  reportData: any;
  loadStatus: boolean
  st_date: any;
  en_date: any;
  titieDate: string;

  constructor(private cmsService: CmsService, ) {
    this.loadStatus = false;
    this.titieDate = "";
  }

  ngOnInit() {
    this.getReport();
  };


  getChart() {
    const chart1 = new CanvasJS.Chart("chartContainer", {
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
          { y: this.reportData.leve1.game_won, name: "Lv1 win" },
          { y: this.reportData.leve2.game_won, name: "Lv2 win" },
          { y: this.reportData.leve3.game_won, name: "lv3 win" },
          { y: this.reportData.leve1.game_Lost, name: "Lv1 lose" },
          { y: this.reportData.leve2.game_Lost, name: "Lv2 lose" },
          { y: this.reportData.leve3.game_Lost, name: "lv3 lose" },
        ]
      }]
    });

    const chart2 = new CanvasJS.Chart("chartContainer2", {
      theme: "light2", // "light2", "dark1", "dark2"
      title: {
        text: "Award results"
      },
      data: [
        {
          type: "column", // Change type to "column" , "bar", "area", "spline", "pie",etc.
          dataPoints: [
            { label: "Level1", y: this.reportData.leve1.award },
            { label: "Level2", y: this.reportData.leve3.award },
            { label: "Level3", y: this.reportData.leve3.award }
          ]

        }
      ]
    });

    var chart4 = new CanvasJS.Chart("chartContainer4", {
      exportEnabled: true,
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Report use of scores at different levels"
      },
      subtitles: [{
        text: "Click Legend to Hide or Unhide Data Series"
      }],
      axisX: {
        title: "States"
      },
      axisY: {
        title: "Points for play",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },
      axisY2: {
        title: "Reward points",
        titleFontColor: "#4ba353",
        lineColor: "#C0504E",
        labelFontColor: "#4ba353",
        tickColor: "#C0504E"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      data: [{
        type: "column",
        name: "Points for play",
        showInLegend: true,
        yValueFormatString: "#,##0.# Point",
        dataPoints: [
          { label: "Level 1", y: (this.reportData.leve1.visits) * 1 },
          { label: "Level 2", y: (this.reportData.leve2.visits) * 2 },
          { label: "Level 3", y: (this.reportData.leve3.visits) * 3 },
        ]
      },
      {
        type: "column",
        name: "Reward points",
        axisYType: "secondary",
        showInLegend: true,
        yValueFormatString: "#,##0.# Point",
        dataPoints: [
          { label: "Level 1", y: (this.reportData.leve1.award) * 20 },
          { label: "Level 2", y: (this.reportData.leve2.award) * 50 },
          { label: "Level 3", y: (this.reportData.leve3.award * 100) },
        ]
      }]
    });
    chart4.render();

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    }



    chart1.render();
    chart2.render();
    // chart3.render();

  }


  getReport() {
    this.titieDate = "";
    this.alertLoading(true)
    this.cmsService.getReport().subscribe((res: any) => {
      if (res.resultCode === "20000") {
        this.reportData = res.data;
        setTimeout(() => {
          this.getChart()
        }, 1500);
        setTimeout(() => {
          this.alertLoading(false)
        }, 1000);
        // this.getChart();
      }
      // Err
    });


  }


  alertLoading(val: boolean): void {
    if (val === true) {
      this.loadStatus = true;
      // let element: HTMLInputElement = document.getElementById('modalLoading') as HTMLInputElement;
      // element.style.display = "block";
      // element.click();
    } else if (val === false) {
      this.loadStatus = false;
      // let element: HTMLInputElement = document.getElementById('closeModalLoading') as HTMLInputElement;
      // element.style.display = "none";
      // element.click();
    }
  }

  ChooseDate() {
    let element: HTMLInputElement = document.getElementById('modalChooseDate') as HTMLInputElement;
    element.style.display = "block";
    element.click();

  }

  getReportTime(){
    var stDate = new Date(this.st_date);
    var enDate = new Date(this.en_date);

    this.alertLoading(true)
    this.cmsService.getReportTime(stDate.getTime(),enDate.getTime()).subscribe((res: any) => {
      if (res.resultCode === "20000") {
        this.reportData = res.data;
        this.titieDate = res.data.reportDate;
        setTimeout(() => {
          this.getChart()
        }, 1500);
        setTimeout(() => {
          this.alertLoading(false)
        }, 1000);
        // this.getChart();
      }
      // Err
    });
  }



}