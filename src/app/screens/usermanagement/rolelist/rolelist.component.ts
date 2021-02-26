import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Group } from 'src/app/models/group';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.scss'],
})
export class RolelistComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Role>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  role!: Role;
  groups!: Group[];
  responseModel!: Responsemodel;
  roleId!: number;
  roleForm!: FormGroup;
  plantId!: number;
  formMode!: boolean;

  roleColumns: string[] = ['roleId', 'group', 'name', 'roleActions'];
  roleData!: MatTableDataSource<Role>;
  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.formMode = true;
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      group: ['', Validators.required],
    });
    this.getRoles();
    this.getPlants();
    this.getGroups();
  }
  getPaginator(): void {
    setTimeout(() => {
      this.roleData.paginator = this.paginator;
      this.roleData.sort = this.sort;
    }, 1000);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roleData.filter = filterValue.trim().toLowerCase();

    if (this.roleData.paginator) {
      this.roleData.paginator.firstPage();
    }
  }

  getRoles(): void {
  }
  getGroups(): void {
  }

  getPlants(): void {
  }

  getRole(roleId: number, rolemodel: any): void {
  }

  openModal(rolemodel: any): void {
    // this.roleFormReset();
    this.roleForm.get('group')?.setValue(JSON.parse(localStorage.user).egId);
    this.formMode = true;
    this.dialog.open(rolemodel, {
      width: '600px',
    });
  }

  submitRole(): any {
    const key = {
      name: this.roleForm.value.name,
      egId: this.roleForm.value.group,
    };
  }

  updateRole(): void {
    this.role = this.roleForm.value;
    const key = {
      roleId: this.roleId,
      name: this.role.name,
      egId: this.roleForm.value.group,
    };
  }


}
