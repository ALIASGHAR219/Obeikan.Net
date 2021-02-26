import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Chart from 'chart.js';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-autonomous-maintanance-db',
  templateUrl: './autonomous-maintanance-db.component.html',
  styleUrls: ['./autonomous-maintanance-db.component.scss']
})
export class AutonomousMaintananceDbComponent implements OnInit {

  // Drop-down Variables
  yearList = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  monthList = ['ALL', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weekList = ['ALL', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayList = ['ALL', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  shiftList = ['ALL', 'Morning', 'Evening', 'Night'];
  machineList = ['ALL', 'RTM1', 'RTM2'];

  // charts VAriable
  plantList = ['P1', 'P2'];
  canvas: any;
  ctx: any;
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
  ctx7: any;
  canvas8: any;
  ctx8: any;
  canvas9: any;
  ctx9: any;
  canvas10: any;
  ctx10: any;
  canvas11: any;
  ctx11: any;

  // iconUrl
  menuRedIconUrl = 'assets/images/menu-bottom-red-icon.png';
  menuGreenIconUrl = 'assets/images/menu-bottom-green-icon.png';

  startDate = new FormControl(moment());
  endDate = new FormControl(moment());

  constructor() { }

  ngOnInit(): void {
    Chart.defaults.global.legend.labels.usePointStyle = true;

    // % of Defect Closing
    this.canvas = document.getElementById('myChart');
    this.canvas.height = 400;
    this.canvas.width = 560;
    this.ctx = this.canvas.getContext('2d');
    // this.ctx.height = 400;
    const defectClosing = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        datasets: [{
          label: '  Defects Closed',
          data: [63, 73, 78, 80, 90, 62, 50, 68, 78, 65, 75],
          backgroundColor: 'rgba(16,206,156,1)',
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
            label: (tooltipItem: any, data: any) => {
              return data.datasets[0].data[tooltipItem.index] + '%';
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
              display: false,
            }
          }],
          yAxes: [{
            gridLines: {
              borderDash: [8, 4],
            },
            ticks: {
              gridDashType: 'dash',
              min: 0,
              max: 100,
              callback: (value: any) => {
                return value + '%';
              }
            }
          }]
        }
      }
    });

    // Defects by Type
    this.canvas1 = document.getElementById('multiVariableChart4');
    this.canvas1.height = 400;
    this.canvas1.width = 560;
    this.ctx1 = this.canvas1.getContext('2d');
    const defectType = new Chart(this.ctx1, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        datasets: [{
          label: '  Defects Area',
          data: [48, 58, 92, 62, 56, 36, 41, 35, 64, 69, 60],
          backgroundColor: 'rgba(4,4,150,1)',
          borderWidth: 0.5,

        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        labelString: 'Percentage',
        tooltips: {
          callbacks: {
            label: (tooltipItem: any, data: any)  => {
              return data.datasets[0].data[tooltipItem.index] + '%';
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
              callback: (value: any) => {
                return value + '%';
              }
            }
          }]
        }
      }
    });

    // % of CIL Adherence
    this.canvas2 = document.getElementById('myChart2');
    this.ctx2 = this.canvas2.getContext('2d');
    this.canvas2.height = 400;
    this.canvas2.width = 560;
    const cilAdherence = new Chart(this.ctx2, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ],
        datasets: [{
          label: '  CIL Adherence',
          data: [80, 60, 62, 65, 79, 81, 40, 52, 60, 78, 90],
          backgroundColor: 'rgba(16,206,156,1)',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        labelString: 'Percentage',
        tooltips: {
          callbacks: {
            label: (tooltipItem: any, data: any)  => {
              return data.datasets[0].data[tooltipItem.index] + '%';
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
              callback: (value: any) => {
                return value + '%';
              }
            }
          }]
        }
      }
    });

    // % of CIL Tasks
    this.canvas3 = document.getElementById('myChart1');
    this.ctx3 = this.canvas3.getContext('2d');
    this.canvas3.height = 400;
    this.canvas3.width = 560;
    const cilTasks = new Chart(this.ctx3, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', ],
        datasets: [{
          label: '  Defect Type',
          data: [35, 40, 66, 78, 89, 69, 58, 72, 82, 51, 60],
          backgroundColor: 'rgba(58,175,228, 0.8)',
          borderWidth: 1,

        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        labelString: 'Percentage',
        tooltips: {
          callbacks: {
            label: (tooltipItem: any, data: any)  => {
              return data.datasets[0].data[tooltipItem.index] + '%';
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
              callback: (value: any) => {
                return value + '%';
              }
            }
          }]
        }
      }
    });

    // % of CIL Tasks by Operator
    this.canvas4 = document.getElementById('myChart4');
    this.canvas4.height = 400;
    this.canvas4.width = 560;
    this.ctx4 = this.canvas4.getContext('2d');
    const cilTasksOperator = new Chart(this.ctx4, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', ],
        datasets: [{
          label: '  Task Operator',
          data: [79, 60, 62, 65, 79, 81, 40, 52, 60, 78, 90],
          backgroundColor: 'rgba(58,175,228, 0.8)',
          borderWidth: 1,

        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        labelString: 'Percentage',
        tooltips: {
          callbacks: {
            label: (tooltipItem: any, data: any)  => {
              return data.datasets[0].data[tooltipItem.index] + '%';
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
              callback:  (value: any) => {
                return value + '%';
              }
            }
          }]
        }
      }
    });

    // CIL Time by Operator
    this.canvas5 = document.getElementById('myChart6');
    this.canvas5.height = 400;
    this.canvas5.width = 560;
    this.ctx5 = this.canvas5.getContext('2d');
    const cilTimeOperator = new Chart(this.ctx5, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', ],
        datasets: [{
          label: '  Time Trend',
          data: [35, 40, 66, 79, 89, 69, 58, 72, 82, 50, 60],
          backgroundColor: 'rgba(4,4,150,1)',
          borderWidth: 1,

        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        labelString: 'Percentage',
        tooltips: {
          callbacks: {
            label: (tooltipItem: any, data: any)  => {
              return data.datasets[0].data[tooltipItem.index] + '%';
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
              max: 100,
              callback: (value: any) => {
                return value + '%';
              }
            }
          }]
        }
      }
    });

    // CIL Time Trend
    this.canvas6 = document.getElementById('myChart3');
    this.ctx6 = this.canvas6.getContext('2d');
    this.canvas6.height = 400;
    this.canvas6.width = 560;
    const cilTimeTrend = new Chart(this.ctx6, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        datasets: [{
          label: '  CIL Tasks',
          data: [52, 40, 70, 42, 52, 81, 38, 69, 79, 60, 62],
          backgroundColor: 'rgba(58,175,228, 0.8)',
          borderWidth: 1,

        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        labelString: 'Percentage',
        tooltips: {
          callbacks: {
            label: (tooltipItem: any, data: any)  => {
              return data.datasets[0].data[tooltipItem.index] + '%';
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
              max: 100,
              callback: (value: any) => {
                return value + '%';
              }
            }
          }]
        }
      }
    });

    // CIL Time by Machine
    this.canvas7 = document.getElementById('myChart7');
    this.ctx7 = this.canvas7.getContext('2d');
    this.canvas7.height = 400;
    this.canvas7.width = 560;
    const cilTimeMachine = new Chart(this.ctx7, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
          label: 'Machine Time',
          data: [50, 80, 42, 72, 58],
          backgroundColor: 'rgba(58,175,228, 0.8)',
          borderWidth: 1,

        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        display: true,
        labelString: 'Percentage',
        tooltips: {
          callbacks: {
            label: (tooltipItem: any, data: any)  => {
              return data.datasets[0].data[tooltipItem.index] + '%';
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
              callback: (value: any) => {
                return value + '%';
              }
            }
          }]
        }
      }
    });

    // Defects Solved by Operators vs Technicians
    this.canvas8 = document.getElementById('multiVariableChart1');
    this.canvas8.height = 400;
    this.canvas8.width = 560;
    this.ctx8 = this.canvas8.getContext('2d');
    // this.ctx.height = 400;
    const multiVariableChart1 = new Chart(this.ctx8, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [{
          label: '  Operators',
          data: [2, 4, 2.8, 3.8, 4.5, 2.4, 3.2, 2.4, 1.8, 1.8, 5.5, 5],
          backgroundColor: 'rgba(4,4,150,1)',
          borderWidth: 1,
        }, {
          label: '  Technicians',
          data: [1, 1.8, 2.5, 3.2, 4.2, 2.5, 4, 2, 1.2, 2.5, 4.2, 4.2],
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
            label: (tooltipItem: any, data: any) => {
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

    // Defect Raised and Solved by Person
    this.canvas9 = document.getElementById('multiVariableChart2');
    this.canvas9.height = 400;
    this.canvas9.width = 560;
    this.ctx9 = this.canvas9.getContext('2d');
    const multiVariableChart2 = new Chart(this.ctx9, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [{
          label: '  Defect Raised',
          data: [2, 3.2, 4.8, 3.8, 4.5, 1.4, 1.8, 1.4, 3, 3.2, 5, 4.8],
          backgroundColor: 'rgba(4,4,150,1)',
          borderWidth: 1,
        }, {
          label: '  Defect Solved',
          data: [1.5, 1.8, 2.2, 2.8, 2.8, 1.5, 2.2, 1.2, 2.2, 3.8, 4.2, 4.2],
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
            label: (tooltipItem: any, data: any) => {
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

    // Open Defects vs Closed Defects
    this.canvas10 = document.getElementById('multiVariableChart3');
    this.canvas10.height = 400;
    this.canvas10.width = 560;
    this.ctx10 = this.canvas10.getContext('2d');
    // this.ctx.height = 400;

    const multiVariableChart3 = new Chart(this.ctx10, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', ],
        datasets: [{
          label: 'Open Defects',
          data: [57.5, 54.2, 0, 25, 45, 32],
          backgroundColor: 'rgba(248,84,57,1)',
          borderWidth: 1,
        }, {
          label: 'Closed Defects',
          data: [0, 57.5, 54.2, 25, 45, 32],
          // data: [{ x: 1, y: 58.1 }, { x: 4, y: 56.2 }, { x: 5, y: 63 }, { x: 9, y: 57 }, { x: 11, y: 59.2 }, { x: 12, y: 61 }],
          backgroundColor: 'rgba(16,206,156,1)',
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
            label: (tooltipItem: any, data: any) => {
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
              min: 50,
              max: 66,
              callback: (value: any, index: any) => {
                if (value === 0) { return 100 + '%'; }
                else { return value + '%'; }
              }
            },
          }]
        }
      }
    });

    // Open Defects by Area
    this.canvas11 = document.getElementById('myChart5');
    this.canvas11.height = 400;
    this.canvas11.width = 560;
    this.ctx11 = this.canvas11.getContext('2d');
    // this.ctx.height = 400;
    const openDefectArea = new Chart(this.ctx11, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
          label: '  Time Operator',
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
            label: (tooltipItem: any, data: any) => {
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
              max: 16,
              callback: (value: any) => {
                return value + '%';
              }
            }
          }]
        }
      }
    });

  }

}
