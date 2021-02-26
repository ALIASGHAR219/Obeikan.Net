import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Plant } from 'src/app/models/plant';
import { Role } from 'src/app/models/role';
import { RolePermission } from 'src/app/models/rolePermission';
import { KpimasterService } from 'src/app/services/kpimaster.service';
import { UsermanagementService } from 'src/app/services/usermanagement.service';
import { Group } from 'src/app/models/group';
import { arrayToTree } from 'performant-array-to-tree';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-rolepermissions',
  templateUrl: './rolepermissions.component.html',
  styleUrls: ['./rolepermissions.component.scss'],
})
export class RolepermissionsComponent implements OnInit {
  plants!: Plant[];
  roles!: Role[];
  groups!: Group[];
  roleId!: number;
  plantId!: number;
  roleSearchForm!: FormGroup;
  menulist!: RolePermission[];
  selectedMenu!: RolePermission;
  groupValue!: number;
  selectedNodes3!: any[] ;
  files5!: any[];
  loading = false;

  constructor(private userService: UsermanagementService, private toaster: ToastrService,
              private fb: FormBuilder, private masterService: KpimasterService) { }

  ngOnInit(): void {
    this.menulist = [];
    this.roleSearchForm = this.fb.group({
      role: ['', Validators.required],
      group: ['', Validators.required],
    });
    this.getGroups();

    this.roleSearchForm.get('group')?.setValue(this.groups.find((d) => d.egId === JSON.parse(localStorage.user).egId));
  }
  async getGroups(): Promise<void> {
    this.masterService.getGroups().subscribe(
      (groups) => {
        this.groups = groups.filter((d) => d.egId === JSON.parse(localStorage.user).egId);
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }
  getRoles(): any {
    const key = {
      egId: this.roleSearchForm.value.group,
    };
    this.userService.masterroles(key).subscribe(
      (data: any) => {
        this.roles = data;
      },
      (error: any) => {
        this.toaster.error('Error', error.error.message);
      }
    );
  }

  searchRolePermissions(): void {
    this.roleId = this.roleSearchForm.value.role;
    this.loading = true;
    const search = {
      roleId: this.roleId,
      egId: this.roleSearchForm.value.group,
    };
    this.userService.rolePermissions(search).subscribe(
      (response) => {
        this.menulist = response;
        this.files5 = arrayToTree(response);
        this.selectedNodes3 = [];
        const seletedData = arrayToTree(response);
        if (seletedData.length) {
          seletedData.forEach(element => {
            this.selectedNodes3 =  this.selectedNodes3.concat(this.userService.getSelectedNodesFlatArray(element));
          });
        // if (seletedData.length) {
        //   // this.setSelectedNodesOnSearch(seletedData[0]);
        //   seletedData.forEach(element => {
        //     this.setSelectedNodesOnSearch(element);
        //   });
        }
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }

  setSelectedNodesOnSearch(node: any): any{
    this.selectedNodes3.push(node);
    const allSelectedChildNodes = node.children.filter( (child: any) =>  child.data.IsSelect );
    if (allSelectedChildNodes.length) {
      // this.selectedNodes3 = this.selectedNodes3.concat(allSelectedChildNodes);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < allSelectedChildNodes.length; i++) {
        this.setSelectedNodesOnSearch(allSelectedChildNodes[i]);
      }
    }
  }

  selectionChange(event: any, menuId: number): void {
    const m = this.menulist.find((x) => x.MenuId === menuId);
    if (m?.IsSelect === true) {
      m.IsSelect = false;
      m.IsRead = false;
      m.IsCreate = false;
      m.IsUpdate = false;
      m.IsDelete = false;
      m.IsApprove = false;
      m.IsPrint = false;
    } else if (m?.IsSelect === false) {
      m.IsSelect = true;
      m.IsRead = true;
      m.IsCreate = true;
      m.IsUpdate = true;
      m.IsDelete = true;
      m.IsApprove = true;
      m.IsPrint = true;
    }
  }
  unselectionChange(event: any, menuId: number): any {
    const m = this.menulist.find((x) => x.MenuId === menuId);
    if (m?.IsSelect === true) {
      m.IsSelect = false;
      m.IsRead = false;
      m.IsCreate = false;
      m.IsUpdate = false;
      m.IsDelete = false;
      m.IsApprove = false;
      m.IsPrint = false;
    } else if (m?.IsSelect === false) {
      m.IsSelect = false;
      m.IsRead = false;
      m.IsCreate = false;
      m.IsUpdate = false;
      m.IsDelete = false;
      m.IsApprove = false;
      m.IsPrint = false;
    }
  }
  checkAllPermission(event: any, menuId: number): void {
    const m = this.menulist.find((x) => x.MenuId === menuId);
    if (m?.IsSelect !== undefined) {
      m.IsSelect = true;
      m.IsRead = true;
      m.IsCreate = true;
      m.IsUpdate = true;
      m.IsDelete = true;
      m.IsApprove = true;
      m.IsPrint = true;
  }
}
  uncheckAllPermission(event: any, menuId: number): void {
    const m = this.menulist.find((x) => x.MenuId === menuId);
    if (m?.IsSelect !== undefined) {
      m.IsSelect = false;
      m.IsRead = false;
      m.IsCreate = false;
      m.IsUpdate = false;
      m.IsDelete = false;
      m.IsApprove = false;
      m.IsPrint = false;
    }
  }
  readChange(event: any, menuId: number): void {
    const m = this.menulist.find((x) => x.MenuId === menuId);
    if (m?.IsRead === true) {
      m.IsRead = false;
    } else if (m?.IsRead === false) {
      m.IsRead = true;
    }
    if (
      m?.IsCreate === false ||
      m?.IsUpdate === false ||
      m?.IsDelete === false ||
      m?.IsApprove === false ||
      m?.IsRead === false ||
      m?.IsPrint === false
    ) {
      if (
        m?.IsCreate === false &&
        m?.IsUpdate === false &&
        m?.IsDelete === false &&
        m?.IsApprove === false &&
        m?.IsRead === false &&
        m?.IsPrint === false
      ) {
        m.IsSelect = false;
      }
      m.IsSelect = true;
    } else if (
      m?.IsCreate === true ||
      m?.IsUpdate === true ||
      m?.IsDelete === true ||
      m?.IsApprove === true ||
      m?.IsRead === true ||
      m?.IsPrint === true
    ) {
      m.IsSelect = true;
    }
  }
  writeChange(event: any, menuId: number): void {
    const m = this.menulist.find((x) => x.MenuId === menuId);
    if (m?.IsCreate === true) {
      m.IsCreate = false;
    } else if (m?.IsCreate === false) {
      m.IsCreate = true;
    }
    if (
      m?.IsCreate === false ||
      m?.IsUpdate === false ||
      m?.IsDelete === false ||
      m?.IsApprove === false ||
      m?.IsRead === false ||
      m?.IsPrint === false
    ) {
      if (
        m?.IsCreate === false &&
        m?.IsUpdate === false &&
        m?.IsDelete === false &&
        m?.IsApprove === false &&
        m?.IsRead === false &&
        m?.IsPrint === false
      ) {
        m.IsSelect = false;
      }
      m.IsSelect = true;
    } else if (
      m?.IsCreate === true ||
      m?.IsUpdate === true ||
      m?.IsDelete === true ||
      m?.IsApprove === true ||
      m?.IsRead === true ||
      m?.IsPrint === true
    ) {
      m.IsSelect = true;
    }
  }
  updateChange(event: any, menuId: number): void {
    const m = this.menulist.find((x) => x.MenuId === menuId);
    if (m?.IsUpdate === true) {
      m.IsUpdate = false;
    } else if (m?.IsUpdate === false) {
      m.IsUpdate = true;
    }
    if (
      m?.IsCreate === false ||
      m?.IsUpdate === false ||
      m?.IsDelete === false ||
      m?.IsApprove === false ||
      m?.IsRead === false ||
      m?.IsPrint === false
    ) {
      if (
        m?.IsCreate === false &&
        m?.IsUpdate === false &&
        m?.IsDelete === false &&
        m?.IsApprove === false &&
        m?.IsRead === false &&
        m?.IsPrint === false
      ) {
        m.IsSelect = false;
      }
      m.IsSelect = true;
    } else if (
      m?.IsCreate === true ||
      m?.IsUpdate === true ||
      m?.IsDelete === true ||
      m?.IsApprove === true ||
      m?.IsRead === true ||
      m?.IsPrint === true
    ) {
      m.IsSelect = true;
    }
  }
  deleteChange(event: any, menuId: number): void {
    const m = this.menulist.find((x) => x.MenuId === menuId);
    if (m?.IsDelete === true) {
      m.IsDelete = false;
    } else if (m?.IsDelete === false) {
      m.IsDelete = true;
    }
    if (
      m?.IsCreate === false ||
      m?.IsUpdate === false ||
      m?.IsDelete === false ||
      m?.IsApprove === false ||
      m?.IsRead === false ||
      m?.IsPrint === false
    ) {
      if (
        m?.IsCreate === false &&
        m?.IsUpdate === false &&
        m?.IsDelete === false &&
        m?.IsApprove === false &&
        m?.IsRead === false &&
        m?.IsPrint === false
      ) {
        m.IsSelect = false;
      }
      m.IsSelect = true;
    } else if (
      m?.IsCreate === true ||
      m?.IsUpdate === true ||
      m?.IsDelete === true ||
      m?.IsApprove === true ||
      m?.IsRead === true ||
      m?.IsPrint === true
    ) {
      m.IsSelect = true;
    }
  }
  approveChange(event: any, menuId: number): void {
    const m = this.menulist.find((x) => x.MenuId === menuId);
    if (m?.IsApprove === true) {
      m.IsApprove = false;
    } else if (m?.IsApprove === false) {
      m.IsApprove = true;
    }
    if (
      m?.IsCreate === false ||
      m?.IsUpdate === false ||
      m?.IsDelete === false ||
      m?.IsApprove === false ||
      m?.IsRead === false ||
      m?.IsPrint === false
    ) {
      if (
        m?.IsCreate === false &&
        m?.IsUpdate === false &&
        m?.IsDelete === false &&
        m?.IsApprove === false &&
        m?.IsRead === false &&
        m?.IsPrint === false
      ) {
        m.IsSelect = false;
      }
      m.IsSelect = true;
    } else if (
      m?.IsCreate === true ||
      m?.IsUpdate === true ||
      m?.IsDelete === true ||
      m?.IsApprove === true ||
      m?.IsRead === true ||
      m?.IsPrint === true
    ) {
      m.IsSelect = true;
    }
  }
  printChange(event: any, menuId: number): void {
    const m = this.menulist.find((x) => x.MenuId === menuId);
    if (m?.IsPrint === true) {
      m.IsPrint = false;
    } else if (m?.IsPrint === false) {
      m.IsPrint = true;
    }
    if (
      m?.IsCreate === false ||
      m?.IsUpdate === false ||
      m?.IsDelete === false ||
      m?.IsApprove === false ||
      m?.IsRead === false ||
      m?.IsPrint === false
    ) {
      if (
        m?.IsCreate === false &&
        m?.IsUpdate === false &&
        m?.IsDelete === false &&
        m?.IsApprove === false &&
        m?.IsRead === false &&
        m?.IsPrint === false
      ) {
        m.IsSelect = false;
      }
      m.IsSelect = true;
    } else if (
      m?.IsCreate === true ||
      m?.IsUpdate === true ||
      m?.IsDelete === true ||
      m?.IsApprove === true ||
      m?.IsRead === true ||
      m?.IsPrint === true
    ) {
      m.IsSelect = true;
    }
  }

  saveData(): void {
    if (this.menulist.length > 0) {
      // const permissionsArray = this.menulist.filter((x) => x.IsSelect === true);
      const seletedPemissions = Array.from(new Set(this.selectedNodes3.map((x: any) => x.data.id)))
      .map(id => {
        return {
          data: this.selectedNodes3.find((node: any) => node.data.id === id).data,
          // children: this.selectedNodes3.find((node: any) => node.data.id === id).children,
        };
      });
      const permissionsArray = seletedPemissions.filter(
        x => x.data.IsSelect === true
      ).map(x => x.data);
      const data = {
        search: {
          roleId: this.roleId,
          egId: this.roleSearchForm.value.group,
        },
        menuArray: permissionsArray,
      };
      this.userService.updateRolePermissions(data).subscribe(
        (response) => {
          this.toaster.success('Success', 'Data Saved Successfuly');
        },
        (error) => {
          this.toaster.error('Error', error.message);
        }
      );
    } else {
      this.toaster.info('Warning', 'Please Select Role for Seach Menu');
    }
  }

  resetRoleForm(): void {
    this.roleSearchForm.reset();
  }
  onHeaderCheckboxToggle(event: any): any {
    // this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    // this.selectionChange(event , event.node.data.MenuId);
    // this.chekNode(this.files5, event.node.data.id);
    if (event.checked){
      this.selectedNodes3 =[];
      this.selectedNodes3 = arrayToTree(this.menulist);
      arrayToTree(this.menulist).forEach(element => {
        this.selectAllNodesByHeader(element , true);
        this.setSelectedNodesOnSearch(element);
      });
      console.log(this.selectedNodes3);
    }else{
      this.selectedNodes3 = [];
      arrayToTree(this.menulist).forEach(element => {
        this.selectAllNodesByHeader(element , false);
      });
    }
  }
  selectAllNodesByHeader(node: any, type: boolean): any{
    if (type) {
      this.checkAllPermission(null, node.data.id);
    }else{
      this.uncheckAllPermission(null , node.data.id);
    }
    if (node.children.length) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < node.children.length; i++) {
        if (type){
        // this.checkAllPermission(null , node.children[i].data.id);
        this.selectAllNodesByHeader( node.children[i] , true);
        }else{
          // this.uncheckAllPermission(null , node.children[i].data.id);
          this.selectAllNodesByHeader( node.children[i] , false);
        }
      }
    }
  }
  nodeSelect(event: any): any {
    // this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    // this.selectionChange(event , event.node.data.MenuId);
    this.chekNode([event.node], event.node.data.id);
    // this.selectedNodes3.push(event.node.parent);
  }
  chekNode(data: any, id: any): any {
    data.forEach((o: any, i: any): any => {
      if (o.data.id && o.data.id === id) {
        this.checkAllPermission(i , id);
        if (o.children.length) {
          this.recursive(o.children, true);
        }
        if (o.parent) {
          debugger;
          this.parentRecursiveSelection(o.parent, true);
        }
      }
    });
  }
 
  recursive(childrenArray: any, type: boolean): any{
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < childrenArray.length; index++) {
      const child = childrenArray[index];
      if (type) {
        this.checkAllPermission([child] , child.data.id);
      }else{
        this.uncheckAllPermission([child] , child.data.id);
      }
      // this.selectionChange([child] , child.data.id);
      if (child.children.length) {
        this.recursive(child.children, type);
      }
    }
  }
  parentRecursiveSelection(parentdata: any, type: boolean): any{
    // tslint:disable-next-line:prefer-for-of

      if (type) {
        this.checkAllPermission([parentdata] , parentdata.data.id);
        // this.selectedNodes3.filter((x: any)=> x.)
        this.selectedNodes3.push(parentdata);
      }
      else{
        debugger;
        this.uncheckAllPermission([parentdata] , parentdata.data.id);
        if (!this.selectedNodes3.find((node) => node.data.id === parentdata.data.id ) ) {
          this.selectedNodes3.push(parentdata);
        }
      }

      if (parentdata.parent) {
        this.parentRecursiveSelection(parentdata.parent, type);
      }

    }

  unchekNode(data: any, id: any): any {
    data.forEach((o: any, i: any): any => {
      if (o.data.id && o.data.id === id) {
        this.uncheckAllPermission(i, id);
        // tslint:disable-next-line:prefer-for-of
        if (o.children.length) {
          this.recursive(o.children, false);
        }
        if (o.parent) {
          if (o.parent.children.length > 1) {
            const isSelectedChildExist = o.parent.children.filter((child: any) => child.data.IsSelect);
            if (!isSelectedChildExist.length) {
              this.parentRecursiveSelection(o.parent, false);
            }
          }
        }
      }
    });
  }

  nodeUnselect(event: any): any {
    this.unchekNode([event.node], event.node.data.id);
  }

}
