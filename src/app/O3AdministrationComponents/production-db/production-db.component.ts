import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Chart from 'chart.js';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-production-db',
  templateUrl: './production-db.component.html',
  styleUrls: ['./production-db.component.scss']
})
export class ProductionDbComponent implements OnInit {

  // Drop-down Variables
  yearList = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  monthList = ['ALL', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weekList = ['ALL', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayList = ['ALL', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  shiftList = ['ALL', 'Morning', 'Evening', 'Night'];
  machineList = ['ALL', 'RTM1', 'RTM2'];

  // charts VAriable
  plantList = ['P1', 'P2'];
  canvas1: any;
  ctx1: any;
  canvas2: any;
  ctx2: any;
  canvas3: any;
  ctx3: any;
  canvas4: any;
  ctx4: any;
  canvas5: any;
  ctx5: any;
  canvas6: any;
  ctx6: any;
  canvas7: any;

  oeeAnalysis = {
    barType: 'radial',
    color: '#10CE9C',
    secondColor: '#E5E5E5',
    progress: 85,
    radial: {
      depth: 8,
      size: 96,
      label: {
        enable: true,
        color: '#09608c',
      }
    }
  };
  capacityUtilizationAnalysis = {
    barType: 'radial',
    color: '#3AAFE4',
    secondColor: '#E5E5E5',
    progress: 55,
    radial: {
      depth: 8,
      size: 96,
      label: {
        enable: true,
        color: '#09608c',
      }
    }
  };
  availabilityAnalysis = {
    barType: 'radial',
    color: '#F85439',
    secondColor: '#E5E5E5',
    progress: 45,
    radial: {
      depth: 8,
      size: 96,
      label: {
        enable: true,
        color: '#F85439',
      }
    }
  };
  performanceAnalysis = {
    barType: 'radial',
    color: '#3AAFE4',
    secondColor: '#E5E5E5',
    progress: 65,
    radial: {
      depth: 8,
      size: 96,
      label: {
        enable: true,
        color: '#09608c',
      }
    }
  };

  qualityAnalysis = {
    barType: 'radial',
    color: '#F85439',
    secondColor: '#E5E5E5',
    progress: 45,
    radial: {
      depth: 8,
      size: 96,
      label: {
        enable: true,
        color: '#F85439',
      }
    }
  };
  // iconUrl
  menuRedIconUrl = 'assets/images/menu-bottom-red-icon.png';
  menuGreenIconUrl = 'assets/images/menu-bottom-green-icon.png';

  startDate = new FormControl(moment());
  endDate = new FormControl(moment());

  constructor() { }

  ngOnInit(): void {
    Chart.defaults.global.legend.labels.usePointStyle = true;

    // Open Defects vs Closed Defects
    this.canvas1 = document.getElementById('OEETrend');
    this.canvas1.height = 400;
    this.canvas1.width = 560;
    this.ctx1 = this.canvas1.getContext('2d');
    const dataone = [57.5, 54.2, 0];
    const datatwo = [0, 57.5, 54.2];
    const datathree = [57.5, 0, 54.2];
    // this.ctx.height = 400;

    const OEETrend = new Chart(this.ctx1, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],

        datasets: [{
          label: '  Lorem Ipsem',
          data: dataone,
          backgroundColor: 'rgba(248,84,57,1)',
          borderWidth: 1,
        }, {
          label: '  Lorem Ipsum 1',
          data: datatwo,
          // data: [{ x: 1, y: 58.1 }, { x: 4, y: 56.2 }, { x: 5, y: 63 }, { x: 9, y: 57 }, { x: 11, y: 59.2 }, { x: 12, y: 61 }],
          backgroundColor: 'rgba(16,206,156,1)',
          borderWidth: 1,
        }, {
          label: '  Target OEE',
          data: datathree,
          // data: [{ x: 1, y: 57 }, { x: 2, y: 62.1 }, { x: 3, y: 55 },
          // { x: 4, y: 54.1 }, { x: 5, y: 62 }, { x: 6, y: 56 },
          // { x: 7, y: 56 }, { x: 12, y: 61 }, { x: 8, y: 55 }, /
          // { x: 9, y: 55.3 }, { x: 9, y: 55.8 }, { x: 10, y: 55.8 }, { x: 11, y: 58.1 }, { x: 12, y: 61 }],
          backgroundColor: 'rgba(4,4,150,1)',
          borderWidth: 1,
        }, ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        parsing: false,
        display: true,
        labelString: 'Percentage',

        tooltips: {
          callbacks: {
            label(tooltipItem: any, data: any): any {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const index = tooltipItem.index;
              return dataset.labels[index] + ': ' + dataset.data[index];
            }
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              borderDash: [8, 4],
            },
            ticks: {
              min: 50,
              max: 66,
              callback(value: any, index: any): any {
                if (value === 0) { return 100 + '%'; }
                else { return value + '%'; }
              }
            },
          }]
        }
      }
    });

    // Open Defects by Area
    this.canvas2 = document.getElementById('VolumeOutput');
    this.canvas2.height = 400;
    this.canvas2.width = 560;
    this.ctx2 = this.canvas2.getContext('2d');
    // this.ctx.height = 400;
    const VolumeOutput = new Chart(this.ctx2, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
          label: '  Defects ',
          data: [12.2, 9.2, 6.1, 4, 4, 4],
          backgroundColor: 'rgba(4,4,150,1)',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        labelString: 'Percentage',
        display: true,
        tooltips: {
          callbacks: {
            label(tooltipItem: any, data: any): any {
              return Number(tooltipItem.yLabel) + '%';
            }
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              Linedash: [10, 5],
              min: 0,
              max: 16,
              callback(value: any): any {
                return value + '%';
              }
            }
          }]
        }
      }
    });

    this.canvas3 = document.getElementById('OEELoses');
    this.canvas3.height = 400;
    this.canvas3.width = 560;
    this.ctx3 = this.canvas3.getContext('2d');
    // this.ctx.height = 400;
    const OEELoses = new Chart(this.ctx3, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        datasets: [{
          label: '  Lorem Ipsem',
          data: [0, 0, 0, [1, 1.2], [0.8, 1], [0.7, 0.8], [0.6, 0.7], 0],
          backgroundColor: 'rgba(248,84,57,1)',
          // borderWidth: 1,

        }, {
          label: '  Lorem Ipsem 1',
          data: [0, 0, 0, 0, 0, 0, 0, [0, 0.6]],
          backgroundColor: 'rgba(16,206,156,1)',
          // borderWidth: 1,

        }, {
          label: '  Target OEE',
          data: [[0, 1.4], [1.2, 1.4], [0, 1.2], 0, 0, 0, 0, 0],
          backgroundColor: 'rgba(4,4,150,1)',
          // borderWidth: 1,

        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        tooltips: {
          callbacks: {
            label(t: any, d: any): any {
              const dstLabel = d.datasets[t.datasetIndex].label;
              const yLabel = t.yLabel;
              return dstLabel + ': ' + yLabel;
            }
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20
          }
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            }
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              borderDash: [8, 4],
            },
            ticks: {
              stepSize: 0.4,
              min: 0,
              max: 1.6,
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.canvas4 = document.getElementById('OutputLoses');
    this.canvas4.height = 400;
    this.canvas4.width = 560;
    this.ctx4 = this.canvas4.getContext('2d');
    const OutputLoses = new Chart(this.ctx4, {
      type: 'bar',
      data: {
        labels:  ['1', '2', '3', '4', '5', '6', '7', '8'],
        datasets: [{
          label: '  Lorem Ipsem',
          data: [[0, 150], 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgba(248,84,57,1)',
          // borderWidth: 1,

        }, {
          label: '  Lorem Ipsem 1',
          data: [0, [150, 200], [200, 250], [250, 270], [270, 300], [300, 305], [305, 310], 0],
          backgroundColor: 'rgba(16,206,156,1)',
          // borderWidth: 1,

        }, {
          label: '  Target OEE',
          data: [0, 0, 0, 0, 0, 0, 0, [0, 310]],
          backgroundColor: 'rgba(4,4,150,1)',
          // borderWidth: 1,

        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        labelString: 'Percentage',
        tooltips: {
          callbacks: {
            label(t: any, d: any): any {
              const dstLabel = d.datasets[t.datasetIndex].label;
              const yLabel = t.yLabel;
              return dstLabel + ': ' + yLabel;
            }
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20
          }
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              borderDash: [8, 4],
            },
            ticks: {
              gridDashType: 'dash',
              stepSize: 100,
              min: 0,
              max: 400,
              beginAtZero: true
            }
          }]
        }
      }
    });


    // No of Production Orders Completed vs Total
    this.canvas5 = document.getElementById('POCompleted');
    this.canvas5.height = 400;
    this.canvas5.width = 560;
    this.ctx5 = this.canvas5.getContext('2d');
    // this.ctx.height = 400;
    const POCompleted = new Chart(this.ctx5, {
      type: 'bar',
      data: {
        labels:  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [{
          label: '  Production Orders',
          data: [5.5, 3.2, 4.9, 5, 2.8, 6.2, 1.8, 3.8, 3, 3.2, 7, 5.8],
          backgroundColor: 'rgba(4,4,150,1)',
          borderWidth: 1,
        }, {
          label: '  Total',
          data: [4.2, 1.8, 4.4, 4.4, 2.8, 5.8, 2.2, 4.4, 2.1, 4.3, 4.3, 4.3],
          backgroundColor: 'rgba(16,206,156,1)',
          borderWidth: 1,
        }, ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        tooltips: {
          callbacks: {
            label(tooltipItem: any, data: any): any {
              return Number(tooltipItem.yLabel) + '%';
            }
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              borderDash: [8, 4],
            },
            ticks: {
              min: 0,
              max: 8,
              beginAtZero: true
            }
          }]
        }
      }
    });

    // % of Production Orders Closed On-Time
    this.canvas6 = document.getElementById('POClosed');
    this.canvas6.height = 400;
    this.canvas6.width = 560;
    this.ctx6 = this.canvas6.getContext('2d');
    const POClosed = new Chart(this.ctx6, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        datasets: [{
          label: '  Production Orders',
          data: [80, 60, 92, 88, 58, 78, 88, 75, 88, 92, 88],
          backgroundColor: 'rgba(4,4,150,1)',
          borderWidth: 1,
        }, ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        labelString: 'Percentage',
        tooltips: {
          callbacks: {
            label(tooltipItem: any, data: any): any {
              return Number(tooltipItem.yLabel) + '%';
            }
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              borderDash: [8, 4],
            },
            ticks: {
              Linedash: [10, 5],
              min: 0,
              max: 100,
              callback(value: any): any {
                return value + '%';
              }
            }
          }]
        }
      }
    });

  }

}
