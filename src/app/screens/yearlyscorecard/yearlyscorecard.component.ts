import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Plant } from 'src/app/models/plant';
import { Tool } from 'src/app/models/tool';
import { Action } from 'src/app/models/action';
import { Frequency } from 'src/app/models/frequency';
import { KpimasterService } from 'src/app/services/kpimaster.service';
import { ToastrService } from 'ngx-toastr';
import { FourM } from '../../models/fourM';
import { Kpireason } from 'src/app/models/kpireason';
import { ScorecardService } from 'src/app/services/scorecard.service';
import { LossanalysisService } from 'src/app/services/lossanalysis.service';
import { UserPlant } from 'src/app/models/userPlant';

@Component({
  selector: 'app-yearlyscorecard',
  templateUrl: './yearlyscorecard.component.html',
  styleUrls: ['./yearlyscorecard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class YearlyscorecardComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private kpiMaster: KpimasterService,
    private toaster: ToastrService,
    private scorecardservice: ScorecardService,
    private fb: FormBuilder,
    private lossAnalysisService: LossanalysisService
  ) {
    this.getAllPlants();
  }

  yearlyScoreForm!: FormGroup;
  searchPlants!: UserPlant[];
  frequencies!: Frequency[];
  columnDefs!: any;
  scoreCardFormMode!: string;
  rowData!: any[];
  toolslist!: Tool[];
  fourMList!: FourM[];
  toolPath!: string;
  toolName!: string;
  reasonslist!: Kpireason[];
  VisibleScoreCardTarget = false;
  actionlist: Action[] = [];
  newAttribute: Action = {
    action: '',
    targetDate: '',
    actionId: 0,
    lossAnalysisId: 0,
  };
  gridOptions: any = {
    defaultColDef: {
      filter: 'agTextColumnFilter',
      floatingFilterComponentParams: {
        suppressFilterButton: false,
      },
      filterParams: { newRowsAction: 'keep' },
    },
    popupParent: document.querySelector('body'),
    floatingFilter: true,
  };

  ngOnInit(): void {
    this.yearlyScoreForm = this.fb.group({
      plant: ['', Validators.required],
      fromDate: [''],
      toDate: [''],
    });
  }

  getAllPlants(): void {
    const key = {
      userId: JSON.parse(localStorage.user).userId,
    };
    this.kpiMaster.getUserPants(key).subscribe(
      (plants) => {
        this.searchPlants = plants;
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }

  generateColumns(data: any[]): any {
    let columnDefinitions: any[] = [];
    //  this.gridOptions.columnApi.setColumnsVisible('KPIId', false);
    data.map((object) => {
      Object.keys(object).map((key) => {
        const mappedColumn = {
          headerName: key, // .toUpperCase()
          // headerClass: 'header-style',
          field: key,
          rowGroup: false,
          width: 200,
          cellStyle: {},
          hide: false,
          filter: true,
        };
        // if (key === 'KPIId') {
        //   mappedColumn.hide = true;
        // }
        // if (key === 'Driver') {
        //   mappedColumn.rowGroup = true;
        // }

        // mappedColumn.headerClass = (params: any): any => {
        //   return ;
        // };
        mappedColumn.cellStyle = (params: any): any => {
          const styleObj = {
            'font-weight': 'bold',
            'background-color': '',
            color: '',
          };

          if (
            key !== 'KPICode' &&
            key !== 'Group' &&
            key !== 'Vision' &&
            key !== 'Driver' &&
            key !== 'KPI Name' &&
            key !== 'Trend' &&
            key !== 'Owner' &&
            key !== 'Unit Of Measure'
          ) {
            styleObj['background-color'] = '#ccffff';
          }
          if (key === 'Actual gap against expected') {
            styleObj['background-color'] = 'green';
            styleObj.color = 'white';
          }
          return styleObj;
        };

        columnDefinitions.push(mappedColumn);
      });
    });

    columnDefinitions = columnDefinitions.filter(
      (column, index, self) =>
        index ===
        self.findIndex((colAtIndex) => colAtIndex.field === column.field)
    );
    return columnDefinitions;
  }
  onPlantChange(): any {
    const date = new Date();
    const getdata = {
      plantId: this.yearlyScoreForm.value.plant.ptId,
      fromDate:  new Date(date.getFullYear(), 0, 1),
      toDate: new Date(date.getFullYear(), 11, 31),
    };
    if (getdata.plantId === undefined || !getdata.fromDate) {
      this.toaster.warning('Warning', 'Please Select Plant And Dates');
      return;
    }
    this.scorecardservice.getYearlyScoreCard(getdata).subscribe(
      (response: any) => {
        this.rowData = response;
        if (this.rowData) {
          this.columnDefs = this.generateColumns(this.rowData);
        }
      },
      (error: any) => {
        this.toaster.error('Error', error.message);
      }
    );
  }
  onDateChange(value: any): any {
    const getdata = {
      plantId: this.yearlyScoreForm.value.plant.ptId,
      fromDate: this.yearlyScoreForm.value.fromDate,
      toDate: this.yearlyScoreForm.value.toDate,
    };
    if (getdata.plantId === undefined || !getdata.fromDate) {
      this.toaster.warning('Warning', 'Please Select Plant And Dates');
      return;
    }
    this.scorecardservice.getYearlyScoreCard(getdata).subscribe(
      (response: any) => {
        this.rowData = response;
        if (this.rowData) {
          this.columnDefs = this.generateColumns(this.rowData);
        }
      },
      (error: any) => {
        this.toaster.error('Error', error.message);
      }
    );
  }

  fielArrayValueChange(event: any, index: number): void {
    const field = this.actionlist[index];
    field.action = event.target.value;
  }

  fielDateValueChange(event: any, index: number): void {
    const field = this.actionlist[index];
    field.targetDate = new Date(event).toISOString();
  }

  deleteFieldValue(index: any): void {
    this.actionlist.splice(index, 1);
  }
}
function getSqlDate(value: any): any {
  return (
    value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate()
  );
}
