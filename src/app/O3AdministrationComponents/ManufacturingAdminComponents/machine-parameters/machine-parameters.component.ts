import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PlantGroupElement, PlantModelElement, MachineParameterVariableElement } from 'src/app/models/O3AdministrationModels/plant-model';
import { MachineParameterElement } from 'src/app/models/O3AdministrationModels/plant-model';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface Group {
  value: string;
  viewValue: string;
}

interface VariableGroup {
  value: string;
  viewValue: string;
}

interface DataType {
  value: string;
  viewValue: string;
}

interface DataSource {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-machine-parameters',
  templateUrl: './machine-parameters.component.html',
  styleUrls: ['./machine-parameters.component.scss']
})
export class MachineParametersComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  // form unitDetailForm fields controls
  get unitDetailFormControls(): any { return this.unitDetailForm.controls; }

  // First Tab-  form addNewPlantModeItemlForm fields controls
  get addNewVariableGroupItemlFormControls(): any { return this.addNewVariableGroupItemlForm.controls; }

  // // Second Tab- form addNewPlantModeItemlForm fields controls
  get addNewVariableItemlFormControls(): any { return this.addNewVariableItemlForm.controls; }

  group: Group[] = [
    { value: 'None', viewValue: 'None' },
    { value: 'OIG', viewValue: 'OIG' },
  ];

  variableGroup: VariableGroup[] = [
    { value: 'None', viewValue: 'None' },
    { value: 'Brand Company', viewValue: 'Brand Company' },
  ];

  dataSource: DataSource[] = [
    { value: 'None', viewValue: 'None' },
    { value: 'AutoLog', viewValue: 'AutoLog' },
    { value: 'Historian', viewValue: 'Historian' },
  ];

  dataType: DataType[] = [
    { value: 'String', viewValue: 'String' },
    { value: 'Int', viewValue: 'Int' },
    { value: 'Float', viewValue: 'Float' },
  ];

  // Table data for first tab
  machineParameterVariableGroupColumns: string[] = ['ID', 'groupDescription', 'machine', 'groupOrder', 'createdBy', 'createdOn', 'plantModelActions'];
  machineParameterVariableGroupData = new MatTableDataSource<MachineParameterElement>(MachineParameterElementData);

  // Table data for Second tab
  machineParameterVariableColumns: string[] = ['varID', 'varDescription', 'varOrder', 'dataSource', 'dataType', 'createdBy', 'createdOn', 'plantModelActions'];
  machineParameterVariableData = new MatTableDataSource<MachineParameterVariableElement>(MachineParameterVariableElementData);

  searchForm!: FormGroup;
  isSarchFormVisible = false;


  unitDetailForm!: FormGroup;
  UnitNode: any;
  Group!: string;
  VariableGroup!: string;
  UnitName!: string;
  varUnitName!: string;
  isUnitName = false;
  unitDetailFormFormSubmitted = false;
  // tslint:disable-next-line:variable-name
  _isDisabled = true;

  // Variable Group Form
  addNewVariableGroupItemlForm!: FormGroup;
  isaddNewVariableGroupModelVisible = false;
  addNewVariableGroupItemlFormSubmitted = false;

  // second Tab variables
  addNewVariableItemlForm!: FormGroup;
  isaddNewVariableModelVisible = false;
  addNewVariableItemlFormSubmitted = false;

  // Plant Model Form
  addNewPlantModeItemlForm!: FormGroup;
  isaddNewPlantModeItemModelVisible = false;
  addNewPlantModeItemlFormSubmitted = false;

  isPlantGroupModelVisible = false;

  // plantTitleName: string;
  @ViewChild(MatTable) table!: MatTable<MachineParameterElement>;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  // plant group view
  treeControl = new NestedTreeControl<PlantGroupElement>(node => node.children);
  plantGroupSource = new MatTreeNestedDataSource<PlantGroupElement>();

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      searchValue: ['', Validators.required],
    });

    // Filter Form
    this.unitDetailForm = this.formBuilder.group({
      groupList: [''],
      UnitDataList: [''],
    });

    // First Tab add new Variable Group form
    this.addNewVariableGroupItemlForm = this.formBuilder.group({
      groupDescription: ['', Validators.required],
      groupOrder: ['', Validators.required],
      // VariableGrpUnit: [''],
      VariableGrpGroup: ['', Validators.required],
    });

    // Second Tab add new Variable  form
    this.addNewVariableItemlForm = this.formBuilder.group({
      VariableGrpDesc: ['', Validators.required],
      VariableGrpOrder: ['', Validators.required],
      // VariableGrpUnit: [''],
      VariableGroup: ['', Validators.required],
      EngUnits: ['', Validators.required],
      parameterPrecision: ['', Validators.required],
      InputTag: ['', Validators.required],
      OutputTag: ['', Validators.required],
      LowerRejectLimit: ['', Validators.required],
      LowerWarningLimit: ['', Validators.required],
      Target: ['', Validators.required],
      UpperWarningLiming: ['', Validators.required],
      UpperRejectLimit: ['', Validators.required],
      DataSource: ['', Validators.required],
      DataType: ['', Validators.required],
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.machineParameterVariableGroupData.paginator = this.paginator.toArray()[0];
    this.machineParameterVariableGroupData.sort = this.sort.toArray()[0];
    this.machineParameterVariableData.paginator = this.paginator.toArray()[1];
    this.machineParameterVariableData.sort = this.sort.toArray()[1];
  }

  // open machine parameter variable group model
  openaddNewVariableGroupModel(): void {
    this.isaddNewVariableGroupModelVisible = true;
    this.UnitName = '';
  }

  // close machine parameter variable group model
  closeaddNewVariableGroupModel(): void {
    this.isaddNewVariableGroupModelVisible = false;
  }

  // open machine parameter variable  model
  openaddNewVariableModel(): void {
    this.isaddNewVariableModelVisible = true;
    this.varUnitName = '';
  }

  // close machine parameter variable  model
  closeaddNewVariableModel(): void {
    this.isaddNewVariableModelVisible = false;
  }

  // search form subit
  onSearch(): void {
    const searchValue = this.searchForm.value;
    console.log('searchValue ::', searchValue);
  }

  // open tree structure for unit
  openUnit(): any {
  //   this.isPlantGroupModelVisible = true;
  //   // this.plantGroupSource.data = plantGroupData;
  //   this.treeControl.dataNodes = this.plantGroupSource.data;
  //   function filterData(data: PlantGroupElement[], title: string): any {
  //     const r = data.filter(function (o) {
  //       Object.keys(o).forEach(function (e) {
  //         if (Array.isArray(o[e])) { o[e] = filterData(o[e], title); }
  //       });
  //       return o.title !== title;
  //     });
  //     return r;
  //   }
  //   this.UnitNode = filterData(this.plantGroupSource.data, 'UNT');
  //   console.log(this.UnitNode);
  //   this.treeControl.expandAll();
  //   this.treeControl.collapseDescendants(this.UnitNode);
  }

  SelectUnitName(unitname: any): any {
    if (unitname.title === 'UNT') {
      this.UnitName = unitname.name;
      this.isPlantGroupModelVisible = false;
    }
  }

  // UnitName for second tab
  SelectVarUnitName(unitname: any): any {
    if (unitname.title === 'UNT') {
      this.varUnitName = unitname.name;
      this.isPlantGroupModelVisible = false;
    }
  }

  // add new variable group form submit
  addNewVariableGroupItemlFormSubmit(): void {
    this.addNewVariableGroupItemlFormSubmitted = true;
    this.isUnitName = true;
    // console.log(this.addNewVariableGroupItemlForm.value);

    // stop here if form is invalid
    if (this.addNewVariableGroupItemlForm.invalid) {
      return;
    }
    this.addNewVariableGrpModelRow(this.addNewVariableGroupItemlForm.value);
    this.addNewVariableGroupItemlForm.reset();
    this.UnitName = '';
    this.addNewVariableGroupItemlFormSubmitted = false;
  }

  // update table with new row
  addNewVariableGrpModelRow(data: any): any {
    const newItemID = MachineParameterElementData.length + 1;
    MachineParameterElementData.push(
      { itemID: newItemID, ID: 13, groupDescription: data.groupDescription, machine: this.UnitName, groupOrder: data.groupOrder, createdBy: 'Brand', createdOn: new Date() }
    );

    // update table with new data
    this.machineParameterVariableGroupData.data = MachineParameterElementData;
    this.table.renderRows();

    this.closeaddNewVariableGroupModel();
  }

  // add new variable group form submit
  addNewVariableItemlFormSubmit(): any {
    this.addNewVariableItemlFormSubmitted = true;
    this.isUnitName = true;
    console.log(this.addNewVariableItemlForm.value);

    // stop here if form is invalid
    if (this.addNewVariableItemlForm.invalid) {
      return;
    }
    this.addNewVariableModelRow(this.addNewVariableItemlForm.value);
    this.addNewVariableItemlForm.reset();
    this.UnitName = '';
    this.addNewVariableItemlFormSubmitted = false;
  }

  // update table with new row
  addNewVariableModelRow(data: any): any {
    const newItemID = MachineParameterVariableElementData.length + 1;
    MachineParameterVariableElementData.push(
      // tslint:disable-next-line:max-line-length
      { itemID: newItemID, varID: 12, varDescription: data.VariableGrpDesc, varOrder: data.VariableGrpOrder, dataSource: data.DataSource, dataType: data.DataType, createdBy: 'Brand', createdOn: new Date() }
    );

    // update table with new data
    this.machineParameterVariableData.data = MachineParameterVariableElementData;
    this.table.renderRows();
    this.closeaddNewVariableModel();
  }

  // parent node
  hasChild = (_: number, node: PlantGroupElement) => !!node.children && node.children.length > 0;

  // open model
  openPlantGroupModel(): void {
    this.isPlantGroupModelVisible = true;
    // this.plantGroupSource.data = plantGroupData;
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

const MachineParameterElementData: MachineParameterElement[] = [
  { itemID: 1, ID: 8, groupDescription: 'Testing 123', machine: 'Unit', groupOrder: 1, createdBy: 'Brand', createdOn: new Date('2020/10/28 10:11:33') },
  { itemID: 2, ID: 9, groupDescription: 'Lorem Ipsuem', machine: 'Unit', groupOrder: 2, createdBy: 'Brand', createdOn: new Date('2020/10/28 10:11:33') },
  { itemID: 3, ID: 10, groupDescription: 'Brand Company', machine: 'Unit', groupOrder: 3, createdBy: 'Brand', createdOn: new Date('2020/10/28 10:11:33') },
  { itemID: 4, ID: 11, groupDescription: 'Injection number', machine: 'Unit', groupOrder: 4, createdBy: 'Brand', createdOn: new Date('2020/10/28 10:11:33') },
  { itemID: 5, ID: 12, groupDescription: 'Mold id number', machine: 'Unit', groupOrder: 5, createdBy: 'Brand', createdOn: new Date('2020/10/28 10:11:33') },

];

const MachineParameterVariableElementData: MachineParameterVariableElement[] = [
  // tslint:disable-next-line:max-line-length
  { itemID: 1, varID: 8, varDescription: 'Cooling Water inlet', varOrder: 8, dataSource: 'AutoLog', dataType: 'Float', createdBy: 'Brand', createdOn: new Date('2020/10/28 10:11:33') },
  // tslint:disable-next-line:max-line-length
  { itemID: 2, varID: 9, varDescription: 'Cooling Water outlet', varOrder: 9, dataSource: 'AutoLog', dataType: 'Float', createdBy: 'Brand', createdOn: new Date('2020/10/28 10:11:33') },
  // tslint:disable-next-line:max-line-length
  { itemID: 3, varID: 10, varDescription: 'Cooling Water outlet', varOrder: 10, dataSource: 'AutoLog', dataType: 'Float', createdBy: 'Brand', createdOn: new Date('2020/10/28 10:11:33') },
  // tslint:disable-next-line:max-line-length
  { itemID: 4, varID: 11, varDescription: 'Injection number', varOrder: 11, dataSource: 'AutoLog', dataType: 'Float', createdBy: 'Brand', createdOn: new Date('2020/10/28 10:11:33') },
];

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

