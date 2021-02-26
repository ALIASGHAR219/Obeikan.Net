import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManu } from 'src/app/models/userManu';
import { ToastrService } from 'ngx-toastr';
import { KpimasterService } from 'src/app/services/kpimaster.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss'],
})
export class UsermanagementComponent implements OnInit {
  usermanagements!: any[];
  userMenu!: UserManu[];
  constructor(public router: Router, private toaster: ToastrService, private kpiMaster: KpimasterService) {}

  ngOnInit(): void {
    const list = localStorage.getItem('flatMenuItem');
    const treeData = list !== null ? JSON.parse(list) : [];
    // const allUserPermission = this.userMenu.find(
    //   (x) => x.ParentName === 'User Management' && x.MenuName === 'All Users'
    // );
    // const allRoles = this.userMenu.find(
    //   (x) => x.ParentName === 'User Management' && x.MenuName === 'All Roles'
    // );
    // const rolepermissions = this.userMenu.find(
    //   (x) =>
    //     x.ParentName === 'User Management' && x.MenuName === 'Role Permission'
    // );
    this.usermanagements = [
      // tslint:disable-next-line:max-line-length
      {
        title: 'All Users',
        routerLink: this.getUsers,
        icon: 'assets/images/manufacturing-admin.svg',
        disabled: this.kpiMaster.isMenuEnabled(treeData, 'All Users')
      },
      {
        title: 'All Roles',
        routerLink: this.getRoles,
        icon: 'assets/images/kpi-admin.svg',
        disabled: this.kpiMaster.isMenuEnabled(treeData, 'All Roles')
      },
      // tslint:disable-next-line:max-line-length
      {
        title: 'Roles Permissions',
        routerLink: this.getRolesPermissions,
        icon: 'assets/images/quality-admin.svg',
        disabled: this.kpiMaster.isMenuEnabled(treeData, 'Role Permission')
      },
      {
        title: 'Menus',
        routerLink: this.getMenuComponent,
        icon: 'assets/images/quality-admin.svg',
        // disabled: this.kpiMaster.isMenuEnabled(treeData, 'Role Permission')
      },
    ];
  }

  getUsers = (): void => {
    this.router.navigate(['/users']);
  }
  getRoles = (): void => {
    this.router.navigate(['/roles']);
  }
  getRolesPermissions = (): void => {
    this.router.navigate(['/rolepermissions']);
  }
  getMenuComponent = (): void => {
    this.router.navigate(['/menus']);
  }
}
