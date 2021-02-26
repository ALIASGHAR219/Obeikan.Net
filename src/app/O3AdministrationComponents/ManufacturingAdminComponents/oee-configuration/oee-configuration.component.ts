import { Component, OnInit, ViewChild } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PlantGroupElement, PlantModelElement } from 'src/app/models/O3AdministrationModels/plant-model';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface Rate {
  value: string;
  viewValue: string;
}

interface OutputType {
  value: string;
  viewValue: string;
}

interface OeeTypes {
  value: string;
  viewValue: string;
}

interface Group {
  value: string;
  viewValue: string;
}

interface ParameterGrpDesc {
  value: string;
  viewValue: string;
}
interface Parameter {
  value: string;
  viewValue: string;
}
interface DTCategory {
  value: string;
  viewValue: string;
}
interface WasteCategory {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-oee-configuration',
  templateUrl: './oee-configuration.component.html',
  styleUrls: ['./oee-configuration.component.scss']
})
export class OeeConfigurationComponent implements OnInit {
  group: Group[] = [
    { value: 'None', viewValue: 'None' },
    { value: 'OIG', viewValue: 'OIG' },
  ];

  ParameterGrpDesc: ParameterGrpDesc[] = [
    { value: 'None', viewValue: 'None' },
  ];

  Parameter: Parameter[] = [
    { value: 'None', viewValue: 'None' },
  ];

  DTCategory: DTCategory[] = [
    { value: 'None', viewValue: 'None' },
  ];

  WasteCategory: WasteCategory[] = [
    { value: 'None', viewValue: 'None' },
  ];

  rate: Rate[] = [
    { value: 'Day', viewValue: 'Day' },
    { value: 'Hour', viewValue: 'Hour' },
    { value: 'Minute', viewValue: 'Minute' }
  ];

  Output: OutputType[] = [
    { value: 'NetOutput', viewValue: 'NetOutput' },
    { value: 'GrossOutput', viewValue: 'GrossOutput' },

  ];

  OeeType: OeeTypes[] = [
    { value: 'Simple Average', viewValue: 'Simple Average' },
    { value: 'Weighted Average', viewValue: 'Weighted Average' },
  ];

  unitDetailForm!: FormGroup;
  searchForm!: FormGroup;

  Group!: string;
  ParameterGrpDescs!: string;
  selectedValue!: string;
  UnitName!: string;
  parameter!: string;
  Rate!: string;
  output!: string;
  OEEType!: string;
  dtCategory!: string;
  wasteCategory!: string;
  unitDetailFormFormSubmitted: boolean = false;

  UnitNode: any;

  isPlantGroupModelVisible: boolean = false;


  // plantTitleName: string;
  @ViewChild(MatTable) table!: MatTable<PlantModelElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //Unit detail form
    this.unitDetailForm = this.formBuilder.group({
      groupList: [''],
      UnitDataList: [''],
      ParameterGrpDescsList: [''],
      ParameterList: [''],
      RateList: [''],
      OutputList: [''],
      OEEType: [''],
      dtCategoryList: [''],
      wasteCategory: [''],
    });
  }
  //open tree structure for unit
  openUnit() {
    this.isPlantGroupModelVisible = true;
    this.plantGroupSource.data = plantGroupData;
    this.treeControl.dataNodes = this.plantGroupSource.data;
    function filterData(data: PlantGroupElement[], title: string) {
      var r = data.filter(function (o: any) {
        Object.keys(o).forEach(function (e: any) {
          if (Array.isArray(o[e])) o[e] = filterData(o[e], title);
        });
        return o.title != title
      });
      return r;
    }
    this.UnitNode = filterData(this.plantGroupSource.data, 'UNT');
    this.treeControl.expandAll();
    this.treeControl.collapseDescendants(this.UnitNode)
  }

  SelectUnitName(unitname: any) {
    if (unitname.title === 'UNT') {
      this.UnitName = unitname.name;
      this.isPlantGroupModelVisible = false;
    }
  }

  // form unitDetailForm fields controls
  get unitDetailFormControls() { return this.unitDetailForm.controls; }

  //unit data form submit
  unitDetailFormFormSubmit() {
    this.unitDetailFormFormSubmitted = true;

    // stop here if form is invalid
    if (this.unitDetailForm.invalid) {
      return;
    }
    this.unitDetailForm.controls['UnitDataList'].setValue(this.UnitName);
    console.log(this.unitDetailForm.value);
  }

  // plant group view
  treeControl = new NestedTreeControl<PlantGroupElement>(node => node.children);
  plantGroupSource = new MatTreeNestedDataSource<PlantGroupElement>();

  // parent node
  hasChild = (_: number, node: PlantGroupElement) => !!node.children && node.children.length > 0;

  // open model
  openPlantGroupModel() {
    this.isPlantGroupModelVisible = true;
    this.plantGroupSource.data = plantGroupData;
    this.treeControl.dataNodes = this.plantGroupSource.data;
    this.expandAllNode();
  }

  // close model
  closePlantGroupModel() {
    this.isPlantGroupModelVisible = false;
  }

  // collapse group view
  collapseAllNode() {
    this.treeControl.collapseAll();
  }

  // expand group view
  expandAllNode() {
    this.treeControl.expandAll();
  }
}
const plantGroupData: PlantGroupElement[] = [];
