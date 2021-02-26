import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DefectManagementElement } from 'src/app/models/defectManagementElement';
import { PlantGroupElement } from 'src/app/models/O3AdministrationModels/plant-model';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as moment from 'moment';

@Component({
  selector: 'app-defect-configuration',
  templateUrl: './defect-configuration.component.html',
  styleUrls: ['./defect-configuration.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ left: '10px', height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ left: '10px', height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DefectConfigurationComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    // tslint:disable-next-line:no-shadowed-variable
    private DataSourceService: DataSourceService
  ) { }

  // tslint:disable-next-line:typedef
  get addNewVariableItemlFormControls() { return this.addNewVariableItemlForm.controls; }

  // form searchDefectForm fields controls
  // tslint:disable-next-line:typedef
  get searchDefectFormControls() { return this.searchDefectForm.controls; }

  // Drop-down Variables
  selected: string | undefined;
  selectedMachine: string | undefined;
  selectedComponent: string | undefined;
  selectedDefectType!: string;
  selectedSubDefect!: string;
  selectedDefectPriority!: string;
  selectedDefectStatus!: string;
  selectedDefectClassification!: string;
  selectedPlant!: string;

  // Dropdown Values
  lineList = ['Line 1', 'Line 2'];
  machineList = ['RTM1', 'RTM2'];
  componentList = ['Component1', 'Component2'];
  defectType = ['Lorem', 'Lorem2', 'Damage'];
  subDefectType = ['Lorem Ipsem', 'Lorem Ipsem2'];
  defectPriority = ['A', 'B'];
  defectStatus = ['Open', 'Completed'];
  defectClassification = ['Lorem', 'Lorem2', 'Maintenance'];
  plantList = ['P1', 'P2'];

  // Date-Time Picker Variable
  public date!: moment.Moment;
  public color: ThemePalette = 'primary';

  // Icon Url
  grpImgurl = 'assets/images/grp-icon.png';
  pltImgurl = 'assets/images/plt-icon.png';
  divImgurl = 'assets/images/div-icon.png';
  dptImgurl = 'assets/images/dpt-icon.png';
  linImgurl = 'assets/images/lin-icon.png';
  untImgurl = 'assets/images/unt-icon.png';
  asmImgurl = 'assets/images/asm-icon.png';
  samImgurl = 'assets/images/sam-icon.png';
  copImgurl = 'assets/images/cop-icon.png';
  collapseAllImgurl = 'assets/images/collapse-all-icon.png';
  expandAllImgurl = 'assets/images/expand-all-icon.png';
  downloadIconurl = 'assets/images/download-image-icon.png';
  uploadIconurl = 'assets/images/upload-icon.png';
  editIconurl = 'assets/images/edit-icon.png';
  deleteIconurl = 'assets/images/delete-icon.png';
  messageIconurl = 'assets/images/message-icon.png';

  // Table
  DefectManagementElementData: DefectManagementElement[] = [];
  defectManagementVariableGroupColumns: string[] = ['defectID', 'defect', 'groupName', 'plantName', 'component', 'machineName', 'priority', 'defectStatus', 'Action'];
  defectManagementVariableGroupData = new MatTableDataSource<DefectManagementElement>();

  expandedElement: any;

  // Add new variable Group Form
  iscreateDeffectGroupModelVisible = false;
  addNewVariableItemlForm!: FormGroup;
  addNewVariableItemlFormSubmitted = false;

  // Edit table form
  iseditDeffectGroupModelVisible = false;
  editTableVariableItemlForm!: FormGroup;
  editTableVariableItemlFormSubmitted = false;
  editGroupItemParent!: DefectManagementElement;
  editTableRowID!: number;
  editGroupModelTitle!: string;

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
  });

  // Search form
  searchForm!: FormGroup;
  isSarchFormVisible = false;

  // upload file name
  uploadFileInfo!: string;
  postImageFileInfo!: string;

  // Search defect filter form
  searchDefectForm!: FormGroup;
  LineNode: any;
  UnitName!: string;
  Group!: string;
  ComponentNode: any;
  ComponentName!: string;
  isUnitName = false;
  searchDefectFormSubmitted = false;
  // tslint:disable-next-line:variable-name
  _isDisabled = true;

  isPlantGroupModelVisible = false;

  @ViewChild(MatTable) table!: MatTable<DefectManagementElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // plant group view
  // tslint:disable-next-line:member-ordering
  treeControl = new NestedTreeControl<any>(node => node.children);
  // tslint:disable-next-line:member-ordering
  plantGroupSource = new MatTreeNestedDataSource<any>();

  plantGroupDataParent!: PlantGroupElement;

  ngOnInit(): void {

    this.DataSourceService.getDefectManagementElementData().subscribe((data: any) => {
      // tslint:disable-next-line:no-debugger
      debugger;
      this.datasource(data);
      console.log('res is ', data);
    },
      (      error: any) => { throw error; },
      () => console.log('finished'));
    this.searchForm = this.formBuilder.group({
      searchValue: ['', Validators.required],
    });

    // Filter Form
    this.searchDefectForm = this.formBuilder.group({
      line: [''],
      UnitDataList: [''],
      defectClassification: [''],
      machine: [''],
      defectPriority: [''],
      defectStatus: [''],
    });

    // add new create defect form
    this.addNewVariableItemlForm = this.formBuilder.group({
      line: ['', Validators.required],
      machine: ['', Validators.required],
      // VariableGrpUnit: [''],
      component: ['', Validators.required],
      defect: ['', Validators.required],
      defectType: ['', Validators.required],
      subDefectType: ['', Validators.required],
      defectPriority: ['', Validators.required],
      defectStatus: ['', Validators.required],
      defectClassification: ['', Validators.required],
      date: [''],
    });

    // edit defect form
    this.editTableVariableItemlForm = this.formBuilder.group({
      defect: ['', Validators.required],
      defectType: ['', Validators.required],
      subDefectType: ['', Validators.required],
      defectPriority: ['', Validators.required],
      defectStatus: ['', Validators.required],
      defectClassification: ['', Validators.required],
      defectOn: ['', Validators.required],
      comments: ['', Validators.required],
      assignTo: ['', Validators.required],
      targetDate: ['', Validators.required],
      closeDate: ['', Validators.required],
      fileName: ['', ]
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.defectManagementVariableGroupData.paginator = this.paginator;
    this.defectManagementVariableGroupData.sort = this.sort;
  }

  datasource(data: any): any {
    this.defectManagementVariableGroupData.data = data;
    console.log('defectManagementVariableGroupData', data);
  }

  // open create defect variable group model
  opencreateDefectGroupModel(): void {
    this.iscreateDeffectGroupModelVisible = true;
    // this.UnitName = '';
  }

  // close machine parameter variable  model
  closeaddNewVariableModel(): void {
    this.iscreateDeffectGroupModelVisible = false;
  }

  // open edit defect variable group model
  openEditDefectGroupModel(element: DefectManagementElement): void {
    this.editGroupItemParent = element;
    // console.log("editGroupItemParent:", this.editGroupItemParent);
    this.editGroupModelTitle = this.editGroupItemParent.defect;
    this.editTableRowID = element.defectID;
    this.editTableVariableItemlForm.controls.defect.setValue(element.defect);
    this.selectedDefectType = element.defectType;
    this.selectedSubDefect = element.subDefectType;
    this.selectedDefectPriority = element.defectPriority;
    this.selectedDefectStatus = element.defectStatus;
    this.selectedDefectClassification = element.defectClassification;
    this.editTableVariableItemlForm.controls.defectOn.setValue(element.defectOn);
    this.editTableVariableItemlForm.controls.comments.setValue(element.comments);
    this.editTableVariableItemlForm.controls.assignTo.setValue(element.assignTo);
    this.editTableVariableItemlForm.controls.targetDate.setValue(element.targetDate);
    this.editTableVariableItemlForm.controls.closeDate.setValue(element.closeDate);
    this.uploadFileInfo = element.fileName;
    this.iseditDeffectGroupModelVisible = true;
  }

  // close machine parameter variable  model
  closeEditDefectGroupModel(): void {
    this.iseditDeffectGroupModelVisible = false;
  }

  // edit new plant model form submit
  editTableVariableItemlFormSubmit(): void {
    this.editTableVariableItemlFormSubmitted = true;
    this.editdefectTableRow(this.editTableVariableItemlForm.value);
    this.editTableVariableItemlForm.reset();
    this.editTableVariableItemlFormSubmitted = false;
  }

  // update edited row data
  editdefectTableRow(data: DefectManagementElement): void {
    this.editGroupItemParent.defect = data.defect;
    this.editGroupItemParent.assignTo = data.assignTo;
    this.editGroupItemParent.closeDate = data.closeDate;
    this.editGroupItemParent.comments = data.comments;
    this.editGroupItemParent.defectOn = data.defectOn;
    this.editGroupItemParent.targetDate = data.targetDate;
    this.editGroupItemParent.defectClassification = this.selectedDefectClassification;
    this.editGroupItemParent.defectPriority = this.selectedDefectPriority;
    this.editGroupItemParent.defectType = this.selectedDefectType;
    this.editGroupItemParent.subDefectType = this.selectedSubDefect;
    this.editGroupItemParent.defectStatus = this.selectedDefectStatus;
    this.editGroupItemParent.targetDate = data.targetDate;
    this.editGroupItemParent.closeDate = data.closeDate;
    this.editGroupItemParent.assignPlan = data.assignPlan;
    console.log('editGroupItemParentAfterEdit:', this.editGroupItemParent);
    this.closeEditDefectGroupModel();
  }

  // search form subit
  onSearch(): any {
    const searchValue = this.searchForm.value;
    console.log('searchValue ::', searchValue);
  }

  // open tree structure for unit
  openLineTree(): any {
    this.isPlantGroupModelVisible = true;
    this.plantGroupSource.data = plantGroupData;
    this.treeControl.dataNodes = this.plantGroupSource.data;
    function filterData(data: PlantGroupElement[], title: string): any {
      const r = data.filter((o: any) => {
          Object.keys(o).forEach((e: any) => {
              if (Array.isArray(o[e])) { o[e] = filterData(o[e], title); }
            });
          return o.title !== title;
        });
      return r;
    }

    this.LineNode = filterData(this.plantGroupSource.data, 'LIN');
    // console.log(this.UnitNode);
    // this.treeControl.expandAll();
    // this.treeControl.collapseDescendants(this.UnitNode)
    console.log(this.LineNode);
    this.treeControl.expandAll();
    // this.treeControl.expandDescendants(!this.UnitNode);
    this.treeControl.collapseDescendants(this.LineNode);
  }

  SelectNodeName(line: any): any {
    if (line.title === 'LIN') {
      this.selected = line.name;
      // this.plantGroupSource.data = null;
      // this.treeControl.dataNodes = null;
      console.log(this.selected);
      this.isPlantGroupModelVisible = false;
    }
    if (line.title === 'COP') {
      this.ComponentName = line.name;
      // this.plantGroupSource.data = null;
      // this.treeControl.dataNodes = null;
      console.log(this.selected);
      this.isPlantGroupModelVisible = false;
    }

  }

  // open tree structure for Component
  openComponent(): void {
    // this.isPlantGroupModelVisible = true;
    // this.treeControl.expandAll();
  }

  // add new variable group form submit
  addNewVariableItemlFormSubmit(): void {
    this.addNewVariableItemlFormSubmitted = true;
    this.isUnitName = true;
    console.log(this.addNewVariableItemlForm.value);
    console.log('file Name:', this.uploadFileInfo);
    // console.log("Defect on:", this.dateControlStart.value?.toLocaleString());

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
  addNewVariableModelRow(data: any): void {
    // let newItemID = this.defectManagementVariableGroupData.data.length + 1;
    this.defectManagementVariableGroupData.data.push(
      {
        defectID: 52, defect: data.defect, groupName: data.groupName,
        plantName: data.plantName, component: data.component, machineName: data.machine,
        priority: data.defectPriority, defectStatus: data.defectStatus, createdOn: data.createdOn,
        comments: data.comments, machine: data.machine, line: data.line, assignPlan: data.assignPlan,
        defectType: data.defectType, subDefectType: data.subDefectType, defectPriority: data.defectPriority,
        defectClassification: data.defectClassification, defectOn: data.defectOn, assignTo: data.assignTo,
        targetDate: data.targetDate, closeDate: data.closeDate, fileName: data.fileName,
      }
    );

    // update table with new data
    this.defectManagementVariableGroupData.data = this.defectManagementVariableGroupData.data;
    this.table.renderRows();
    this.closeaddNewVariableModel();
  }


  onFileSelect(input: any): void {
    const file = input.files[0];
    this.uploadFileInfo = `${file.name}`;
  }

  onPostImageFileSelect(input: any): any {
    const file = input.files[0];
    this.postImageFileInfo = `${file.name}`;
    // console.log(this.postImageFileInfo);

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


