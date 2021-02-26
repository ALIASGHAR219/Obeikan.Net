import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {
  PlantGroupElement,
  PlantModelElement,
} from 'src/app/models/O3AdministrationModels/plant-model';
import { EnterPriseGroupService } from 'src/app/services/enterpriseGroup.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UserManu } from 'src/app/models/userManu';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-plant-model',
  templateUrl: './plant-model.component.html',
  styleUrls: ['./plant-model.component.scss'],
})
export class PlantModelComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<PlantModelElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  formMode!: boolean;
  edited = false;
  plantModelColumns: string[] = [
    'EGId',
    'EGDesc',
    'Remarks',
    'GrpOrder',
    'IsActive',
    'CreatedOn',
    'plantModelActions',
  ];
  plantModelData!: MatTableDataSource<PlantModelElement>;
  addNewPlantModeItemlForm!: FormGroup;
  isaddNewPlantModeItemModelVisible = false;
  addNewPlantModeItemlFormSubmitted = false;
  plnatPermission!: UserManu;

  plantgroup!: any;
  plantgroupFormMode!: boolean;

  isPlantGroupModelVisible = false;

  addnewGroupModelTitle = '';
  addNewGroupItemForm!: FormGroup;
  isaddNewGroupItemModelVisible = false;
  addNewGroupItemFormSubmitted = false;
  newGroupItemParent!: PlantGroupElement;

  editGroupModelTitle = '';
  treeControl = new NestedTreeControl<PlantGroupElement>(
    (node) => node.children
  );
  plantGroupSource = new MatTreeNestedDataSource<PlantGroupElement>();

  plantModelRowId!: number;
  // parent node
  hasChild = (_: number, node: PlantGroupElement) =>
    !!node.children && node.children.length >= 0 && node.NextLevel != null
  constructor(
    private formBuilder: FormBuilder,
    private platModelService: EnterPriseGroupService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const listmenu = localStorage.getItem('result');
    const permissions = listmenu !== null ? JSON.parse(listmenu) : [];
    this.plnatPermission = permissions.find(
      (x: { ParentName: string; MenuName: string; Actions: string }) =>
        x.ParentName === 'Manufacturing Admin' &&
        x.MenuName === 'Plant Model' &&
        x.Actions === 'Plant Model'
    );
    this.formMode = true;
    this.plantgroupFormMode = true;
    this.addNewPlantModeItemlForm = this.formBuilder.group({
      groupDescription: ['', Validators.required],
      groupOrder: ['', Validators.required],
      active: [false],
      remarks: ['']
    });
    this.addNewGroupItemForm = this.formBuilder.group({
        description: ['', Validators.required],
        order: ['', Validators.required],
        optional: [''],
        active: [''],
        remarks: ['']
    });
    this.getPlantModel();
  }
  // start add new plant methods
  openaddNewPlantItemModel(): void {
    this.addNewPlantModeItemlForm.reset();
    this.isaddNewPlantModeItemModelVisible = true;
    this.formMode = true;
  }
  closeaddNewPlantItemModel(): void {
    this.isaddNewPlantModeItemModelVisible = false;
  }

  addNewPlantModeItemlFormSubmit(): void {
    const groupKey = {
      EGDesc: this.addNewPlantModeItemlForm.value.groupDescription,
      Remarks: this.addNewPlantModeItemlForm.value.remarks,
      IsActive: this.addNewPlantModeItemlForm.value.active,
      GrpOrder: this.addNewPlantModeItemlForm.value.groupOrder,
      EGId: 0,
      TransactionTypeId: 1
    };
    this.platModelService.submitGroup(groupKey).subscribe(
      (response: any) => {
        // this.toaster.success('Success', 'Frequency Added Successfully');
        this.showPopupMsg(response.ErrorMessage);
        this.getPlantModel();
        this.addNewPlantModeItemlForm.reset();
      },
      (error) => {
        this.toaster.error('Error', error.error.err.message);
      }
    );
    this.table.renderRows();
    this.addNewPlantModeItemlForm.reset();
    this.isaddNewPlantModeItemModelVisible = false;
  }
  // end add new plant methods
  // start edit plant methods
  openEditPlantItemModel(element: any): void {
    const key = {
      EGId: element.EGId
    };
    if (this.plnatPermission.IsUpdate) {
    this.platModelService.getGroupList(key).subscribe((data: any) => {
      const groupdata = data.groupList[0];
      this.openaddNewPlantItemModel();
      this.plantModelRowId = element.EGId;
      this.addNewPlantModeItemlForm.get('groupDescription')?.setValue(groupdata.EGDesc);
      this.addNewPlantModeItemlForm.get('groupOrder')?.setValue(groupdata.GrpOrder);
      this.addNewPlantModeItemlForm.get('active')?.setValue(element.IsActive);
      this.addNewPlantModeItemlForm.get('remarks')?.setValue(element.Remarks);
      this.formMode = false;
    },
      (error) => {
        this.toaster.error('Error', error.error.message);
      }
    );
    }else {
      this.toaster.error(
        'Alert!',
        'you do not have permission to access'
      );
    }
  }
  editPlantModeItemlFormSubmit(): void {
    const groupKey = {
      EGDesc: this.addNewPlantModeItemlForm.value.groupDescription,
      Remarks: this.addNewPlantModeItemlForm.value.remarks,
      IsActive:  this.addNewPlantModeItemlForm.value.active,
      GrpOrder: this.addNewPlantModeItemlForm.value.groupOrder,
      EGId: this.plantModelRowId,
      TransactionTypeId: 2
    };
    this.platModelService.submitGroup(groupKey).subscribe(
      (response: any) => {
        // this.toaster.success('Success', 'Group Update Successfully');
        this.showPopupMsgForGroup(response.ErrorMessage);
        this.getPlantModel();
        this.addNewPlantModeItemlForm.reset();
      },
      (error) => {
        this.toaster.error('Error', error.error.err.message);
      }
    );
    this.table.renderRows();
    this.addNewPlantModeItemlForm.reset();
    this.isaddNewPlantModeItemModelVisible = false;
    this.table.renderRows();
  }
  // end edit plant methods
  // Start Delete Group
  deleteGroup(EGId: number): void {
    if (this.plnatPermission.IsDelete) {
      this.plantModelRowId = EGId;
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete Group!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
          const groupKey = {
            EGDesc: '',
            Remarks: '',
            IsActive: 0,
            GrpOrder: 1,
            EGId,
            TransactionTypeId: 3
          };
          this.platModelService.submitGroup(groupKey).subscribe(
            (success: any) => {
              this.showPopupMsgForGroup(success.ErrorMessage);
              Swal.fire({
                title: 'Deleted!',
                text: 'Your selected Group has been deleted.',
                icon: 'success',
                timer: 800,
                showConfirmButton: false,
              });
              this.getPlantModel();
            },
            (error) => {
              this.toaster.error('Error', error.error.message);
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your Group is safe :)', 'error');
        }
      });
    } else {
      this.toaster.error('Alert!', 'you do not have permission to access');
    }
  }
  // End Delete Group
  // start plant group methods
  openPlantGroupModel(element: any): void {
    this.isPlantGroupModelVisible = true;
    this.getTreeModel(element);
    this.plantgroup = element;
    // this.plantGroupSource.data = plantGroupData;
    // this.treeControl.dataNodes = this.plantGroupSource.data;
  }

  closePlantGroupModel(): void {
    this.isPlantGroupModelVisible = false;
  }

  collapseAllNode(): void {
    this.treeControl.collapseAll();
  }

  expandAllNode(): void {
    this.treeControl.expandAll();
  }
  // end plant group methods
  // start group model methods
  openaddNewGroupModel(element: PlantGroupElement): void {
    if (this.plnatPermission.IsCreate) {
      this.plantgroupFormMode = true;
      this.newGroupItemParent = element;
      this.addnewGroupModelTitle =  element.NextLevel; // (element.NextLevel === 'Unit' ? 'Machine' : element.NextLevel);
      this.addNewGroupItemForm.reset();
      this.isPlantGroupModelVisible = false;
      this.isaddNewGroupItemModelVisible = true;
      // tslint:disable-next-line: max-line-length
      if (element.NextLevel === 'Plant' || element.NextLevel === 'Division' || element.NextLevel === 'Department' || element.NextLevel === 'Assembly' || element.NextLevel === 'SubAssembly'){
        this.edited = true;
      } else {
       this.edited = false;
      }
    } else {
      this.toaster.error('Alert!', 'you do not have permission to access');
    }
  }
  addNewGroupModeItemlFormSubmit(): void {
    const data = {
      Desc: this.addNewGroupItemForm.value.description,
      Remarks: this.addNewGroupItemForm.value.remarks,
      IsOptional: this.addNewGroupItemForm.value.optional,
      IsActive: this.addNewGroupItemForm.value.active,
      Order: this.addNewGroupItemForm.value.order,
      Level: this.newGroupItemParent.Level,
      PrimaryId : this.newGroupItemParent.PrimaryId,
      ParentId: this.newGroupItemParent.parentId,
      TransactionTypeId: 1
    };
    this.platModelService.addPlantModalTree(data).subscribe(response => {
      // this.toaster.success('Success', response.ErrorMessage);
      this.showPopupMsg(response.ErrorMessage);
      // this.isaddNewGroupItemModelVisible = false;
      // this.isPlantGroupModelVisible = true;
      this.getTreeModel(this.plantgroup);
    }, error => {
      this.toaster.error('Error', error.message);
    });
  }
  showPopupMsg(msg: any): any {
    if (msg.substring(2, 1) === '0') {
       this.toaster.success('Success', msg.substring(3, msg.length));
       this.isaddNewGroupItemModelVisible = false;
       this.isPlantGroupModelVisible = true;
    }
    else {
      this.toaster.error('Error', msg.substring(3, msg.length));
    }
}
showPopupMsgForGroup(msg: any): any {
  if (msg.substring(2, 1) === '0') {
     this.toaster.success('Success', msg.substring(3, msg.length));
  }
  else {
    this.toaster.error('Error', msg.substring(3, msg.length));
  }
}

  closeaddNewGroupModel(): void {
    this.isaddNewGroupItemModelVisible = false;
    this.isPlantGroupModelVisible = true;
  }
   openEditGroupModel(element: PlantGroupElement): void {
     if ( this.plnatPermission.IsUpdate ){
     this.plantgroupFormMode = false;
       // tslint:disable-next-line:max-line-length
     if (element.Level === 'Plant' || element.Level === 'Division' || element.Level === 'Department' || element.Level === 'Assembly' || element.Level === 'SubAssembly'){
         this.edited = true;
       } else {
        this.edited = false;
       }
     const data = {
      Level: element.Level,
      PrimaryId: element.PrimaryId
     };
     this.newGroupItemParent = element;
     this.addnewGroupModelTitle = element.Level; // === 'Line' ? 'Machine' : element.Level);
     this.platModelService.getPlantModalById(data).subscribe(response => {
      console.log(response);
      this.addNewGroupItemForm.get('description')?.setValue(response.ChildModelList[0].Desc);
      this.addNewGroupItemForm.get('order')?.setValue(response.ChildModelList[0].Order);
      this.addNewGroupItemForm.get('optional')?.setValue(response.ChildModelList[0].IsOptional);
      this.addNewGroupItemForm.get('active')?.setValue(response.ChildModelList[0].IsActive);
      this.addNewGroupItemForm.get('remarks')?.setValue(response.ChildModelList[0].Remarks);
      this.isaddNewGroupItemModelVisible = true;
      this.isPlantGroupModelVisible = false;
    }, error => {
      this.toaster.error('Error', error.message);
    });
  } else {
    this.toaster.error('Alert!', 'you do not have permission to access');
  }
  }

  editNewGroupModeItemlFormSubmit(): void {
    const data = {
      Desc: this.addNewGroupItemForm.value.description,
      Remarks: this.addNewGroupItemForm.value.remarks,
      IsOptional: this.addNewGroupItemForm.value.optional,
      IsActive: this.addNewGroupItemForm.value.active,
      Order: this.addNewGroupItemForm.value.order,
      Level: this.newGroupItemParent.Level,
      PrimaryId : this.newGroupItemParent.PrimaryId,
      ParentId: this.newGroupItemParent.ParentEditId,
      TransactionTypeId: 2,
      EGId: this.plantgroup.EGId
    };
    this.platModelService.addPlantModalTree(data).subscribe(response => {
      this.showPopupMsg(response.ErrorMessage);
      this.getTreeModel(this.plantgroup);
    }, error => {
      this.toaster.error('Error', error.message);
    });
  }
  deleteGroupNode(node: any): void {
    if (this.plnatPermission.IsDelete) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete ' + this.replaceIcon(node.icon) +  node.text + ' !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
          const data = {
            Desc: '',
            Remarks:  '',
            IsOptional:  true,
            IsActive:  true,
            Order:  1,
            Level: node.Level,
            PrimaryId : node.PrimaryId,
            ParentId: node.ParentEditId,
            TransactionTypeId: 3,
            EGId: this.plantgroup.EGId
          };
          console.log(data);
          this.platModelService.addPlantModalTree(data).subscribe(response => {
            if (response.HasError === false) {
              this.showPopupMsgForGroup(response.ErrorMessage);
              // this.toaster.success('Success', response.ErrorMessage);
              this.isaddNewGroupItemModelVisible = false;
              this.isPlantGroupModelVisible = true;
              this.getTreeModel(this.plantgroup);
            } else {
              this.toaster.error('Error', response.ErrorMessage);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your ' + this.replaceIcon(node.icon) + node.text + ' is safe :)', 'error');
        }
      });
    } else {
      this.toaster.error('Alert!', 'you do not have permission to access');
    }
  }
  // end group model methods
  getPlantModel(): void {
    this.spinner.show();
    const userRoles = JSON.parse(localStorage.user).userRoles;
    const role = userRoles.includes('Super Admin');
    const key = {
      EGId: role ? 0 : JSON.parse(localStorage.user).egId,
    };

    this.platModelService.getGroupList(key).subscribe((frequency: any) => {
      this.plantModelData = new MatTableDataSource<PlantModelElement>(frequency.groupList);
      this.getPaginator();
      this.spinner.hide();
    },
      (error) => {
        this.toaster.error('Error', error.error.message);
        this.spinner.hide();
      }
    );
  }
  getPaginator(): void {
    setTimeout(() => {
      this.plantModelData.paginator = this.paginator;
      this.plantModelData.sort = this.sort;
    }, 1000);
  }
  replaceIcon(value: any): any{
    return value.replace(/(<([^>]+)>)/gi, '');
  }
  replaceString(value: any): any {
    const data = value.split('"')[1];
    if (data === 'IsOptionalplanticon') {
      return true;
    } else {
      return false
    }
  }
  getTreeModel(element: any): void {
    const key = {
      EGId: element.EGId,
      isOptional: 1
    };
    this.platModelService.getTreeModal(key).subscribe((data: any) => {
      const plantGroupData: PlantGroupElement[] = data.TreeModalList;
      this.plantGroupSource.data = plantGroupData;
      this.treeControl.dataNodes = this.plantGroupSource.data;
      this.expandAllNode();
    },
      (error) => {
        this.toaster.error('Error', error.error.message);
      }
    );
  }

}
