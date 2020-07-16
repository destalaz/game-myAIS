import { Component, OnInit } from '@angular/core';
// import * as CanvasJS from '../../../node_modules/canvasjs';
// var CanvasJS = require('./canvasjs.min');
import * as CanvasJS from './canvasjs.min';
import { CmsService } from '../service/cms.service';
import { Router } from '@angular/router';
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
  sumPercentWon: Number;
  title = 'Game-myAIS';
  msgErrDate = "";
  sumPointRate: Number;
  filter = { st: "", en: "" };
  filterBut = false;

  constructor(private cmsService: CmsService, private router: Router, ) {
    this.loadStatus = false;
    this.titieDate = "";
  }

  ngOnInit() {
    this.getReport();
    setTimeout(() => {
      this.filterBut = true;
    }, 2000);
  };


  getChart() {

    CanvasJS.addColorSet("greenShades",
      ["#b5ce50", "#91c95a",]);

    CanvasJS.addColorSet("greenShades2",
      ["#b5ce50", "#91c95a"]);

    var chart1 = new CanvasJS.Chart("chartContainer1", {
      options: {
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        }
      },
      colorSet: "greenShades2",
      exportEnabled: true,
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Redeem & Reward point each level"
      },
      subtitles: [{
        text: "Click Legend to Hide or Unhide Data Series"
      }],
      axisX: {
        // title: "Point"
      },
      axisY: {
        title: "Points",
        titleFontColor: "#323232",
        lineColor: "#4F81BC",
        labelFontColor: "#6E6E6E",
        tickColor: "#4F81BC"
      },
      axisY2: {
        title: "Points",
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
          {
            label: "Lv.1 ",
            y: (this.reportData.leve1.visits) * 1
          },
          {
            label: "Lv.2 ",
            y: (this.reportData.leve2.visits) * 2
          },
          {
            label: "Lv.3 ",
            y: (this.reportData.leve3.visits) * 3
          },
        ]
      },
      {
        type: "column",
        name: "Reward points",
        // axisYType: "secondary",
        showInLegend: true,
        yValueFormatString: "#,##0.# Point",
        dataPoints: [
          { label: "Lv.1", y: (this.reportData.leve1.award) * 20 },
          { label: "Lv.2", y: (this.reportData.leve2.award) * 50 },
          { label: "Lv.3", y: (this.reportData.leve3.award * 100) },
        ]
      }],
    });

    var chart2 = new CanvasJS.Chart("chartContainer2", {
      colorSet: "greenShades",
      exportEnabled: true,
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Winner & Total player each level"
      },
      subtitles: [{
        text: "Click Legend to Hide or Unhide Data Series"
      }],
      axisX: {
        // title: "Visits"
      },
      axisY: {
        title: "Visits",
        titleFontColor: "#323232",
        lineColor: "#4F81BC",
        labelFontColor: "#6E6E6E",
        tickColor: "#4F81BC"
      },
      axisY2: {
        title: "Visits",
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
      data: [
        {
          type: "stackedColumn",
          name: "Game lost",
          // axisYType: "secondary",
          showInLegend: true,
          yValueFormatString: "#,##0.# visits",
          dataPoints: [
            {
              label: "Lv.1 " + " ( Total " + (this.reportData.leve1.visits) + " )",
              y: (this.reportData.leve1.game_Lost)
            },
            {
              label: "Lv.2 " + " ( Total " + (this.reportData.leve2.visits) + " )",
              y: (this.reportData.leve2.game_Lost)
            },
            {
              label: "Lv.3 " + " ( Total " + (this.reportData.leve3.visits) + " )",
              y: (this.reportData.leve3.game_Lost)
            },
          ]
        }
        , {
          type: "stackedColumn",
          name: "Game won",
          showInLegend: true,
          yValueFormatString: "#,##0.# visits",
          dataPoints: [
            {
              label: "Lv.1 " + " ( Total " + (this.reportData.leve1.visitors) + " )",
              y: (this.reportData.leve1.game_won)
            },
            {
              label: "Lv.2 " + " ( Total " + (this.reportData.leve2.visitors) + " )",
              y: (this.reportData.leve2.game_won)
            },
            {
              label: "Lv.3 " + " ( Total " + (this.reportData.leve3.visitors) + " )",
              y: (this.reportData.leve3.game_won)
            },
          ]
        }
      ]

    });



    chart1.render();
    chart2.render();


    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    }



    // chart1.render();
    // chart2.render();
    // chart3.render();

  }


  getReport() {
    this.filter.st = "";
    this.filter.en = "";
    this.st_date = "";
    this.en_date = "";
    this.titieDate = "";
    this.alertLoading(true)
    this.cmsService.getReport().subscribe((res: any) => {
      if (res.resultCode === "20000") {
        this.reportData = res.data;
        this.setSum();
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

  setSum() {
    var sumVistis = this.reportData.leve1.visits + this.reportData.leve2.visits + this.reportData.leve3.visits
    var sumGameWon = this.reportData.leve1.game_won + this.reportData.leve2.game_won + this.reportData.leve3.game_won
    this.sumPercentWon = (sumGameWon / sumVistis) * 100;
    this.sumPointRate = (Number(this.reportData.leve1.game_won) * Number(this.reportData.leve1.award));
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
    this.msgErrDate = "";
    this.st_date = "";
    this.en_date = "";

    let element: HTMLInputElement = document.getElementById('modalChooseDate') as HTMLInputElement;
    element.style.display = "block";
    element.click();

  }

  getReportTime() {
    if (this.st_date === "" || this.en_date === "") { this.st_date = ""; this.en_date = ""; this.getReport(); return }
    var stDate = new Date(this.st_date);
    var enDate = new Date(this.en_date);
    if (stDate.getTime() > enDate.getTime()) { this.msgErrDate = "Invalid datetime range!"; this.st_date = ""; this.en_date = ""; return; }

    this.alertLoading(true)
    this.cmsService.getReportTime(stDate.getTime(), enDate.getTime()).subscribe((res: any) => {
      if (res.resultCode === "20000") {
        this.filter.st = this.st_date
        this.filter.en = this.en_date;
        this.reportData = res.data;
        this.titieDate = res.data.reportDate;

        this.setSum();

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

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  pageCms() {
    this.router.navigate(['/config']);
  }

  filterDate(val) {
    this.filterBut = false;
    var today = new Date();
    var hourago = new Date(today.getTime() - (1000 * 60 * 60));
    if (val.toString() === "custom") { this.getReport(); }
    else if (val.toString() === "refresh") {
      // this.st_date = this.filter.st;
      // this.en_date = this.filter.en;
      this.getReportTime();
    } else if (val.toString() === "hour") {
      this.filter.st = hourago.toString();
      this.filter.en = today.toString();
      this.st_date = hourago;
      this.en_date = today;
      this.getReportTime()
    } else if (val.toString() === "today") {
      const event = new Date();
      event.setHours(0, 0, 0, 0);
      this.filter.st = event.toString();
      this.filter.en = today.toString();
      this.st_date = event;
      this.en_date = today;
      this.getReportTime()
    } else if (val.toString() === "yesterday") {
      var yesterday1 = new Date();
      yesterday1.setDate(yesterday1.getDate() - 1)
      yesterday1.setHours(0, 0, 0, 0);

      var yesterday2 = new Date();
      yesterday2.setDate(yesterday2.getDate())
      yesterday2.setHours(0, 0, 0, 0);

      this.filter.st = yesterday1.toString();
      this.filter.en = yesterday2.toString();

      this.st_date = yesterday1;
      this.en_date = yesterday2;
      this.getReportTime()
    }
    setTimeout(() => {
      this.filterBut = true;
    }, 2000);

  }

  fmtNum(val, decimal: number) {
    try {
      var res = val.toLocaleString(undefined, { 'minimumFractionDigits': decimal, 'maximumFractionDigits': decimal })
      if (res === "NaN" || res === "-NaN" || res === NaN ) { res = 0 }
      return res;
    } catch { return "-" ; }
  }


}