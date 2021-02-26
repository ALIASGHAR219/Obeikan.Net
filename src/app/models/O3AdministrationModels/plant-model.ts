export interface PlantModelElement {
  itemID: number;
  // groupID: number;
  // groupDescription: string;
  // remarks: string;
  // groupOrder: number;
  // active: boolean;
  // createdOn: Date;
  EGId: number;
  EGDesc: string;
  Remarks: string;
  GrpOrder: number;
  IsActive: boolean;
  CreatedOn: Date;
  CreatedBy: number;
}

export interface PlantGroupElement {
  title: string;
  name: string;
  description: string;
  remarks: string;
  order: number;
  active: boolean;
  optional: boolean;
  IsOptional: boolean;
  groupID: number;
  childTitle: string;
  text: string;
  Level: string;
  PrimaryId: number;
  parentId: string;
  ParentEditId: string;
  NextLevel: string;
  icon: string;
  children?: any[];
}
export interface GroupList {
  EGId: number;
  EGDesc: string;
  Remarks: string;
  GrpOrder: number;
  IsActive: boolean;
  CreatedOn: Date;
  CreatedBy: number;
}
export interface MachineParameterElement {
  itemID: number;
  ID: number;
  groupDescription: string;
  machine: string;
  groupOrder: number;
  createdBy: string;
  createdOn: Date;
}

export interface MachineParameterVariableElement {
  itemID: number;
  varID: number;
  varDescription: string;
  varOrder: number;
  dataSource: string;
  dataType: string;
  createdBy: string;
  createdOn: Date;
}
