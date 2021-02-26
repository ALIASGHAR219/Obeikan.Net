import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PlantGroupElement } from 'src/app/models/O3AdministrationModels/plant-model';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { OrderProcessingElement } from 'src/app/models/O3AdministrationModels/orderProcessingElement';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';


interface Group {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-order-processing',
  templateUrl: './order-processing.component.html',
  styleUrls: ['./order-processing.component.scss']
})
export class OrderProcessingComponent implements OnInit {

 constructor(
   private formBuilder: FormBuilder,
   // tslint:disable-next-line:no-shadowed-variable
   private DataSourceService: DataSourceService
 ) { }

 // form unitDetailForm fields controls
 get unitDetailFormControls(): any { return this.unitDetailForm.controls; }

 // Date-Time Picker Variable
 public date: moment.Moment | undefined;
 public disabled = false;
 public showSpinners = true;
 public showSeconds = false;
 public touchUi = false;
 public enableMeridian = false;
 public minDate: moment.Moment | undefined;
 public maxDate: moment.Moment | undefined;
 public stepHour = 1;
 public stepMinute = 1;
 public stepSecond = 1;
 public color: ThemePalette = 'primary';

 public formGroup = new FormGroup({
   date: new FormControl(null, [Validators.required]),
 });
 public dateControlStart = new FormControl(new Date(2021, 9, 4, 5, 6, 0));
 public dateControlEnd = new FormControl(new Date(2021, 10, 4, 5, 6, 0));

 status: Group[] = [
   { value: 'None', viewValue: 'None' },
 ];

 OrderProcessingElementData: OrderProcessingElement[] = [];
 orderProcessingVariableGroupColumns: string[] = ['PO', 'itemCode', 'poTarget', 'plannedStart', 'plannedEnd', 'createdBy', 'createdOn', 'orderProcessingActions'];
 orderProcessingVariableGroupData = new MatTableDataSource<OrderProcessingElement>();

 searchForm!: FormGroup;
 isSarchFormVisible = false;

 unitDetailForm!: FormGroup;
 UnitNode: any;
 Group: string | undefined;
 UnitName: string | undefined;
 isUnitName = false;
 unitDetailFormFormSubmitted = false;
 // tslint:disable-next-line:variable-name
 _isDisabled = true;

 isPlantGroupModelVisible = false;

 @ViewChild(MatTable) table: MatTable<OrderProcessingElement> | undefined;
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;



 // plant group view
 // tslint:disable-next-line:member-ordering
 treeControl = new NestedTreeControl<PlantGroupElement>(node => node.children);
 plantGroupSource = new MatTreeNestedDataSource<PlantGroupElement>();

 ngOnInit(): void {

   this.DataSourceService.getOrderProcessingElementData().subscribe((data: any) => {
     this.datasource(data);
     console.log('res is ', data);
   },
     (     error: any) => { throw error; },
     () => console.log('finished'));
   this.searchForm = this.formBuilder.group({
     searchValue: ['', Validators.required],
   });

   // Filter Form
   this.unitDetailForm = this.formBuilder.group({
     statusList: [''],
     UnitDataList: [''],
   });
 }

 // tslint:disable-next-line:use-lifecycle-interface
 ngAfterViewInit(): any {
   this.orderProcessingVariableGroupData.paginator = this.paginator;
   this.orderProcessingVariableGroupData.sort = this.sort;
 }

 datasource(data: any[]): void {
   this.orderProcessingVariableGroupData.data = data;
   console.log('orderProcessingVariableGroupData', data);
 }

 // search form subit
 onSearch(): any {
   const searchValue = this.searchForm.value;
   console.log('searchValue ::', searchValue);
 }

 // open tree structure for unit
 openUnit(): any {
   this.isPlantGroupModelVisible = true;
   this.plantGroupSource.data = plantGroupData;
   this.treeControl.dataNodes = this.plantGroupSource.data;
   function filterData(data: PlantGroupElement[], title: string): any {
     const r = data.filter( o => {
       // tslint:disable-next-line:no-shadowed-variable
       Object.keys(o).forEach(o => {
         if (Array.isArray(o)) { o = filterData(o, title); }
       });
       return o.title !== title;
     });
     return r;
   }
   this.UnitNode = filterData(this.plantGroupSource.data, 'UNT');
   console.log(this.UnitNode);
   this.treeControl.expandAll();
   this.treeControl.collapseDescendants(this.UnitNode);
 }

 SelectUnitName(unitname: any): void {
   if (unitname.title === 'UNT') {
     this.UnitName = unitname.name;
     this.isPlantGroupModelVisible = false;
   }
 }

 // parent node
 hasChild = (_: number, node: PlantGroupElement) => !!node.children && node.children.length > 0;

 // open model
 openPlantGroupModel(): void {
   this.isPlantGroupModelVisible = true;
   this.plantGroupSource.data = plantGroupData;
   this.treeControl.dataNodes = this.plantGroupSource.data;
   this.expandAllNode();
 }

 // close model
 closePlantGroupModel(): void {
   this.isPlantGroupModelVisible = false;
 }

 // collapse group view
 collapseAllNode(): void {
   this.treeControl.collapseAll();
 }

 // expand group view
 expandAllNode(): void {
   this.treeControl.expandAll();
 }

}


const plantGroupData: any[] = [
  {
    title: 'GRP',
    name: 'OIG',
    description: 'OIG',
    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
    order: 1,
    active: true,
    groupID: 1,
    childTitle: 'PLT',
    optional: false,
    children: [
      {
        title: 'PLT',
        name: 'Plant 1',
        description: 'Plant',
        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
        order: 1,
        active: true,
        groupID: 11,
        childTitle: 'DIV',
        optional: false,
        children: [
          {
            title: 'DIV',
            name: 'Division 1',
            description: 'Division',
            remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
            order: 1,
            active: true,
            groupID: 12,
            childTitle: 'DPT',
            optional: false,
            children: [
              {
                title: 'DPT',
                name: 'Department 1',
                description: 'Department',
                remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                order: 1,
                active: true,
                groupID: 13,
                childTitle: 'LIN',
                optional: false,
                children: [
                  {
                    title: 'LIN',
                    name: 'Line 1',
                    description: 'Line',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 405,
                    childTitle: 'UNT',
                    optional: false,
                  },
                  {
                    title: 'LIN',
                    name: 'Line 2',
                    description: 'Line',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 406,
                    childTitle: 'UNT',
                    optional: false,
                    children: [
                      {
                        title: 'UNT',
                        name: 'Unit 1',
                        description: 'Unit',
                        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                        order: 1,
                        active: true,
                        groupID: 407,
                        childTitle: 'ASM',
                        optional: false,
                      },
                      {
                        title: 'UNT',
                        name: 'Unit 2',
                        description: 'Unit',
                        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                        order: 1,
                        active: true,
                        groupID: 408,
                        childTitle: 'ASM',
                        optional: false,
                      },
                    ]
                  },
                ]
              },
              {
                title: 'DPT',
                name: 'Department 2',
                description: 'Department',
                remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                order: 1,
                active: true,
                groupID: 404,
                childTitle: 'LIN',
                optional: false,
                children: [
                  {
                    title: 'LIN',
                    name: 'Line 1',
                    description: 'Line',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 405,
                    childTitle: 'UNT',
                    optional: false,
                  },
                  {
                    title: 'LIN',
                    name: 'Line 2',
                    description: 'Line',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 406,
                    childTitle: 'UNT',
                    optional: false,
                    children: [
                      {
                        title: 'UNT',
                        name: 'Unit 1',
                        description: 'Unit',
                        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                        order: 1,
                        active: true,
                        groupID: 407,
                        childTitle: 'ASM',
                        optional: false,
                      },
                      {
                        title: 'UNT',
                        name: 'Unit 2',
                        description: 'Unit',
                        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                        order: 1,
                        active: true,
                        groupID: 408,
                        childTitle: 'ASM',
                        optional: false,
                      },
                    ]
                  },
                ]
              },
            ]
          },
          {
            title: 'DIV',
            name: 'Division 2',
            description: '',
            remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
            order: 1,
            active: true,
            groupID: 21,
            childTitle: 'DPT',
            optional: false,
            children: [
              {
                title: 'LIN',
                name: 'Line 1',
                description: 'Line',
                remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                order: 1,
                active: true,
                groupID: 405,
                childTitle: 'UNT',
                optional: false,
              },
              {
                title: 'LIN',
                name: 'Line 2',
                description: 'Line',
                remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                order: 1,
                active: true,
                groupID: 406,
                childTitle: 'UNT',
                optional: false,
                children: [
                  {
                    title: 'UNT',
                    name: 'Unit 1',
                    description: 'Unit',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 407,
                    childTitle: 'ASM',
                    optional: false,
                  },
                  {
                    title: 'UNT',
                    name: 'Unit 2',
                    description: 'Unit',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 408,
                    childTitle: 'ASM',
                    optional: false,
                  },
                ]
              },
            ]
          },
        ]

      },
      {
        title: 'PLT',
        name: 'Plant 2',
        description: 'Plant',
        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
        order: 1,
        active: true,
        groupID: 211,
        childTitle: 'DIV',
        optional: false,
        children: [
          {
            title: 'DIV',
            name: 'Division 1',
            description: 'Division',
            remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
            order: 1,
            active: true,
            groupID: 212,
            childTitle: 'DPT',
            optional: false,
            children: [
              {
                title: 'DPT',
                name: 'Department 1',
                description: 'Department',
                remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                order: 1,
                active: true,
                groupID: 213,
                childTitle: 'LIN',
                optional: false,
              },
              {
                title: 'DPT',
                name: 'Department 2',
                description: 'Department',
                remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                order: 1,
                active: true,
                groupID: 214,
                childTitle: 'LIN',
                optional: false,
                children: [
                  {
                    title: 'LIN',
                    name: 'Line 1',
                    description: 'Line',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 405,
                    childTitle: 'UNT',
                    optional: false,
                  },
                  {
                    title: 'LIN',
                    name: 'Line 2',
                    description: 'Line',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 406,
                    childTitle: 'UNT',
                    optional: false,
                    children: [
                      {
                        title: 'UNT',
                        name: 'Unit 1',
                        description: 'Unit',
                        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                        order: 1,
                        active: true,
                        groupID: 407,
                        childTitle: 'ASM',
                        optional: false,
                      },
                      {
                        title: 'UNT',
                        name: 'Unit 2',
                        description: 'Unit',
                        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                        order: 1,
                        active: true,
                        groupID: 408,
                        childTitle: 'ASM',
                        optional: false,
                      },
                    ]
                  },
                ]
              },
            ]
          },
          {
            title: 'DIV',
            name: 'Division 2',
            description: 'Division',
            remarks: '',
            order: 1,
            active: true,
            groupID: 310,
            childTitle: 'DPT',
            optional: false,
            children: [
              {
                title: 'DPT',
                name: 'Department 1',
                description: 'Department',
                remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                order: 1,
                active: true,
                groupID: 311,
                childTitle: 'LIN',
                optional: false,
              },
              {
                title: 'DPT',
                name: 'Department 2',
                description: 'Department',
                remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                order: 1,
                active: true,
                groupID: 312,
                childTitle: 'LIN',
                optional: false,
                children: [
                  {
                    title: 'LIN',
                    name: 'Line 1',
                    description: 'Line',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 313,
                    childTitle: 'UNT',
                    optional: false,
                  },
                  {
                    title: 'LIN',
                    name: 'Line 2',
                    description: 'Line',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 314,
                    childTitle: 'UNT',
                    optional: false,
                    children: [
                      {
                        title: 'UNT',
                        name: 'Unit 1',
                        description: 'Unit',
                        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                        order: 1,
                        active: true,
                        groupID: 315,
                        childTitle: 'ASM',
                        optional: false,
                      },
                      {
                        title: 'UNT',
                        name: 'Unit 2',
                        description: 'Unit',
                        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                        order: 1,
                        active: true,
                        groupID: 316,
                        childTitle: 'ASM',
                        optional: false,
                      },
                    ]
                  },
                ]
              },
            ]
          },
        ]

      },
      {
        title: 'PLT',
        name: 'Plant 3',
        description: 'Plant',
        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
        order: 1,
        active: true,
        groupID: 401,
        childTitle: 'DIV',
        optional: false,
        children: [
          {
            title: 'DIV',
            name: 'Division 1',
            description: 'Division',
            remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
            order: 1,
            active: true,
            groupID: 402,
            childTitle: 'DPT',
            optional: false,
            children: [
              {
                title: 'DPT',
                name: 'Department 1',
                description: 'Department',
                remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                order: 1,
                active: true,
                groupID: 403,
                childTitle: 'LIN',
                optional: false,
              },
              {
                title: 'DPT',
                name: 'Department 2',
                description: 'Department',
                remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                order: 1,
                active: true,
                groupID: 404,
                childTitle: 'LIN',
                optional: false,
                children: [
                  {
                    title: 'LIN',
                    name: 'Line 1',
                    description: 'Line',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 405,
                    childTitle: 'UNT',
                    optional: false,
                  },
                  {
                    title: 'LIN',
                    name: 'Line 2',
                    description: 'Line',
                    remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                    order: 1,
                    active: true,
                    groupID: 406,
                    childTitle: 'UNT',
                    optional: false,
                    children: [
                      {
                        title: 'UNT',
                        name: 'Unit 1',
                        description: 'Unit',
                        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                        order: 1,
                        active: true,
                        groupID: 407,
                        childTitle: 'ASM',
                        optional: false,
                      },
                      {
                        title: 'UNT',
                        name: 'Unit 2',
                        description: 'Unit',
                        remarks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
                        order: 1,
                        active: true,
                        groupID: 408,
                        childTitle: 'ASM',
                        optional: false,
                      },
                    ]
                  },
                ]
              },
            ]
          },

        ]
      }
    ]
  },
];
