import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManu } from 'src/app/models/userManu';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss'],
})
export class UsermanagementComponent implements OnInit {
  usermanagements!: any[];
  userMenu!: UserManu[];
  constructor(public router: Router, private toaster: ToastrService) {}

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
