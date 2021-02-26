import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role';
import { UsermanagementService } from 'src/app/services/usermanagement.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';
import { Plantbygroup } from 'src/app/models/plantbygroup';
import { KpimasterService } from '../../../services/kpimaster.service';
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
  plant!: Plantbygroup;
  responseModel!: Responsemodel;
  roleId!: number;
  plants!: Plantbygroup[];
  roleForm!: FormGroup;
  plantId!: number;
  formMode!: boolean;

  roleColumns: string[] = ['roleId', 'group', 'name', 'roleActions'];
  roleData!: MatTableDataSource<Role>;
  constructor(
    private fb: FormBuilder,
    private userService: UsermanagementService,
    private toaster: ToastrService,
    private kpiService: KpimasterService,
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
    this.spinner.show();
    const key = {
      egId: JSON.parse(localStorage.user).egId,
    };
    this.userService.getRoles(key).subscribe(
      (rolelist) => {
        this.roleData = new MatTableDataSource<Role>(rolelist);
        this.getPaginator();
        this.spinner.hide();
      },
      (error) => {
        this.toaster.error('Error', error.message);
        this.spinner.hide();
      }
    );
  }
  getGroups(): void {
    this.kpiService.getGroups().subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }

  getPlants(): any {
    this.kpiService.getAllPlants().subscribe(
      (plants) => {
        this.plants = plants;
      },
      (error) => {
        this.toaster.error('Error', error.error.message);
      }
    );
  }

  getRole(roleId: number, rolemodel: any): void {
    const key = {
      roleId,
    };
    this.userService.getOneRole(key).subscribe(
      (role) => {
        this.roleId = roleId;
        this.roleForm.get('name')?.setValue(role.name);
        this.roleForm.get('group')?.setValue(role.egId);
        this.formMode = false;
        this.dialog.open(rolemodel, {
          width: '600px',
        });
      },
      (error) => {
        this.toaster.error('Error', error.error.message);
      }
    );
  }
  roleFormReset(): void {
    this.roleForm.reset();
  }

  openModal(rolemodel: any): void {
    this.roleFormReset();
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
    this.userService.addRole(key).subscribe(
      (response: any) => {
        this.responseModel = response;
        this.toaster.success(
          this.responseModel.message,
          'Role Added Successfuly'
        );
        this.getRoles();
        this.closeRoleModel();
        this.roleFormReset();
      },
      (error: any) => {
        this.toaster.error('Error', error.error.message);
      }
    );
  }

  updateRole(): void {
    this.role = this.roleForm.value;
    const key = {
      roleId: this.roleId,
      name: this.role.name,
      egId: this.roleForm.value.group,
    };
    this.userService.updateRole(key).subscribe(
      (response: any) => {
        this.getRoles();
        this.toaster.success('Success', 'Role Updated Successfuly');
        this.closeRoleModel();
        this.roleFormReset();
      },
      (error: any) => {
        this.toaster.error('Error', error.error.message);
      }
    );
  }

  delete(roleId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete role!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        const key = {
          roleId,
        };
        this.userService.deleteRole(key).subscribe(
          (success) => {
            Swal.fire(
              'Deleted!',
              'Your selected role has been deleted.',
              'success'
            );
            this.getRoles();
          },
          (error) => {
            this.toaster.error('Error', error.error.message);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your selected role is safe :)', 'error');
      }
    });
  }
  closeRoleModel(): void {
    this.dialog.closeAll();
  }
}
