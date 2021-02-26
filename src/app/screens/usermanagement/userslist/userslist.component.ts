import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Group } from 'src/app/models/group';
import { Plantbygroup } from 'src/app/models/plantbygroup';
import { Role } from 'src/app/models/role';
import { Userlist } from 'src/app/models/userlist';
import { UserPermission } from 'src/app/models/userPermission';
import { UserPlant } from 'src/app/models/userPlant';
import { KpimasterService } from 'src/app/services/kpimaster.service';
import { UsermanagementService } from 'src/app/services/usermanagement.service';
import { ProductLine } from 'src/app/models/ProductLine';
import { ProductUnit } from 'src/app/models/ProductUnit';
import { Assembly } from 'src/app/models/assembly';
import { Line } from '../../../models/line';
import { SubAssembly } from 'src/app/models/subAssembly';
import { Components } from 'src/app/models/component';
import { UserManu } from 'src/app/models/userManu';
import { TreeNode } from 'primeng/api';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { EnterPriseGroupService } from 'src/app/services/enterpriseGroup.service';
import { arrayToTree } from 'performant-array-to-tree';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss'],
  providers: [MessageService],

})
export class UserslistComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<Userlist>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Tree
  item!: string;
  level!: number;
  expandable!: boolean;
  // End Tree
  formMode!: boolean;
  roles!: Role[];
  groupId!: number;
  groups!: Group[];
  plants!: Plantbygroup[];
  machineplants!: Plantbygroup[];
  productLines!: ProductLine[];
  productUnits!: ProductUnit[];
  assemblies!: Assembly[];
  subAssemblies!: SubAssembly[];
  components!: Components[];
  users!: Userlist[];
  Lines!: Line[];
  imageSrc!: string;
  userForm!: FormGroup;
  machineForm!: FormGroup;
  page = 1;
  pageSize = 5;
  userlist: Array<Userlist> = [];
  userPersmissions!: UserPermission[];
  userId!: number;
  isLoading = false;
  userPlants!: UserPlant[];
  userPermissionForm!: FormGroup;
  plantId!: number;
  fileSave!: File;
  displayUserRegistration = false;
  displayUserPermission = false;
  displayMachineDailog = false;
  userMenu!: UserManu[];
  userPermission!: UserManu;
  isRead!: boolean;
  isWrite!: boolean;
  isUpdate!: boolean;
  isDelete!: boolean;
  machineTree!: any[];
  selectedMachine!: any;
  selectedNodePermission!: any[] ;
  files5!: any[];
  cols!: any[];
  userColumns: string[] = [
    'userId',
    'firstname',
    'lastname',
    'email',
    'phone',
    'role',
    'userActions',
  ];
  userData!: MatTableDataSource<Userlist>;
  constructor(
    private userService: UsermanagementService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private masterService: KpimasterService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private groupService: EnterPriseGroupService

  ) {}

  ngOnInit(): void {
    const listmenu = localStorage.getItem('result');
    const permissions = listmenu !== null ? JSON.parse(listmenu) : [];
    this.userPermission = permissions.find(
      (x: { ParentName: string; MenuName: string; Actions: string }) =>
        x.ParentName === 'User Management' &&
        x.MenuName === 'All Users' &&
        x.Actions === 'All Users'
    );
    this.isRead = this.userPermission.IsRead;
    this.isWrite = this.userPermission.IsCreate;
    this.isUpdate = this.userPermission.IsUpdate;
    this.isDelete = this.userPermission.IsDelete;
    this.formMode = true;
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: [''],
      group: ['', Validators.required],
      plant: [''],
      image: [''],
    });
    this.userPermissionForm = this.fb.group({
      plant: ['', Validators.required],
    });
    this.machineForm = this.fb.group({
      plant: [''],
      productLine: [''],
      productUnit: [''],
      assembly: [''],
      subassembly: [''],
      component: [''],
      userId: [''],
    });
    this.getUsers();
    this.getGroups();
    this.getMachinePlants();
    this.groupId = JSON.parse(localStorage.user).egId;
    this.cols = [
      { field: 'MenuName', header: 'MenuName' },
      { field: 'Action', header: 'Action' },
      { field: 'IsCreate', header: 'IsCreate' }
  ];
  }

  getPaginator(): void {
    setTimeout(() => {
      this.userData.paginator = this.paginator;
      this.userData.sort = this.sort;
    }, 1000);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userData.filter = filterValue.trim().toLowerCase();

    if (this.userData.paginator) {
      this.userData.paginator.firstPage();
    }
  }
  onFileChange(event: any): any {
    if (event.target.files.length > 0) {
      this.fileSave = event.target.files[0];
    }
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.userForm.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }
  getMasterRoles(): any {
    const key = {
      egId: this.userForm.value.group.egId,
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
  getGroups(): void {
    this.masterService.getGroups().subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }

  onGroupChange(): void {
    const key = {
      egId: this.userForm.value.group.egId,
    };
    this.masterService.getPlants(key).subscribe(
      (plants) => {
        this.plants = plants;
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
    this.getMasterRoles();
  }
  getProductLine(): void {
    const plantArray: number[] = [];
    this.machineForm.value.plant.forEach((plant: { ptId: any; }) => {
      plantArray.push(plant.ptId);
    });
    const key = {
      plantId: plantArray,
    };
    if (plantArray.length > 0) {
      this.masterService.getmasterline(key).subscribe(
        (productLines) => {
          this.productLines = productLines;
        },
        (error) => {
          this.toaster.error('Error', error.message);
        }
      );
    }
  }
  getProductUnits(): void {
    const productLineArray: number[] = [];
    this.machineForm.value.productLine.forEach((productLine: { plId: any; }) => {
      productLineArray.push(productLine.plId);
    });
    const key = {
      lineId: productLineArray,
    };
    this.masterService.getProductUnit(key).subscribe(
      (productUnits) => {
        this.productUnits = productUnits;
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }
  getAssembly(): void {
    const productUnitArray: number[] = [];
    this.machineForm.value.productUnit.forEach((productUnit: { puId: any; }) => {
      productUnitArray.push(productUnit.puId);
    });
    const key = {
      puId: productUnitArray,
    };
    this.masterService.getAssembly(key).subscribe(
      (assemblies) => {
        this.assemblies = assemblies;
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }
  getSubAssembly(): void {
    const assmblyArray: number[] = [];
    this.machineForm.value.assembly.forEach((assembly: { assblyId: any; }) => {
      assmblyArray.push(assembly.assblyId);
    });
    const key = {
      assemblyId: assmblyArray,
    };
    // const key = {
    //   assemblyId: this.machineForm.value.assembly.assblyId,
    // };
    this.masterService.getSubAssembly(key).subscribe(
      (subAssemblies) => {
        this.subAssemblies = subAssemblies;
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }
  getComponent(): void {
    const subassmblyArray: number[] = [];
    this.machineForm.value.subassembly.forEach((subassembly: { sAssblyId: any; }) => {
      subassmblyArray.push(subassembly.sAssblyId);
    });
    const key = {
      subAssemblyId: subassmblyArray,
    };
    // const key = {
    //   subAssemblyId: this.machineForm.value.subassembly.sAssblyId,
    // };
    this.masterService.getComponent(key).subscribe(
      (components) => {
        this.components = components;
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }
  getMachinePlants(): void {
    const key = {
      egId: JSON.parse(localStorage.user).egId,
    };
    this.masterService.getPlants(key).subscribe(
      (plants) => {
        this.machineplants = plants;
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }
  openPermissionModal(userId: number): void {
    if (this.isUpdate) {
      this.userPersmissions = [];
      this.userPlants = [];
      this.displayUserPermission = true;
      this.userId = userId;
      this.getPlantsOfUser(userId);
      this.searchUserPermissions();
    } else {
      this.toaster.error('Alert!', 'you do not have permission to access');
    }
  }

  deleteUser(userId: number): void {
    if (this.isDelete) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete frequency!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
          const key = {
            userId,
          };
          this.userService.deleteUser(key).subscribe((success: any) => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your selected Frequency has been deleted.',
                icon: 'success',
                timer: 800,
                showConfirmButton: false,
              });
              this.getUsers();
            },
            (error: any) => {
              this.toaster.error('Error', error.error.message);
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your frequency is safe :)', 'error');
        }
      });
    } else {
      this.toaster.error('Alert!', 'you do not have permission to access');
    }
  }
  getOneUser(userId: number): void {
    if (this.isUpdate) {
      const key = {
        userId,
      };

      this.userService.getOneUser(key).subscribe(
        (user) => {
          this.userId = userId;
          this.userForm.get('password')?.clearValidators();
          this.userForm.get('username')?.setValue(user.userName);
          this.userForm.get('email')?.setValue(user.email);
          this.userForm.get('password')?.setValue(user.password);
          this.userForm.get('firstName')?.setValue(user.firstName);
          this.userForm.get('lastName')?.setValue(user.lastName);
          this.userForm.get('phoneNumber')?.setValue(user.phoneNumber);
          this.imageSrc = user.imagePath;
          const groupObj = this.groups.find((x) => x.egId === user.egId);
          this.userForm.get('group')?.setValue(groupObj);
          this.onGroupChange();
          if (user.userRoles != null) {
            const roles: string[] = user.userRoles;
            const roleArray = [];

            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < roles.length; i++) {
              const roleObj = this.roles.find(
                (x) => x.roleId === parseInt(roles[i], 10)
              );
              roleArray.push(roleObj);
            }
            this.userForm.get('role')?.setValue(roleArray);
          }
          this.formMode = false;
          this.displayUserRegistration = true;
        },
        (error) => {
          this.toaster.error('Error', error.error.message);
        }
      );
    } else {
      this.toaster.error('Alert!', 'you do not have permission to access');
    }
  }

  getAllComponents(): void {}
  openMachineDailog(userId: number): void {
    this.selectedMachine = [];
    const key = {
      egId: JSON.parse(localStorage.user).egId,
      userId,
    };
    this.userService.getMachineAccess(key).subscribe((response) => {
        this.machineTree = arrayToTree(response, { dataField: null });
        this.selectedMachine = [];
        const seletedData = arrayToTree(response , { dataField: null });
        if (seletedData.length) {
          seletedData.forEach(element => {
            this.selectedMachine =  this.selectedMachine.concat(this.userService.getSelectedNodesMachineFlatArray(element));
          });
        }
      },
      (error) => {
        this.toaster.error('error', error.message);
      }
    );
    if (this.isUpdate) {
      const data = {
        userId,
      };
      this.displayMachineDailog = true;
      this.userId = userId;
    } else {
      this.toaster.error('Alert!', 'you do not have permission to access');
    }
  }
  openModal(): void {
    this.imageSrc = '';
    this.resetForm();
    if (this.isWrite) {
      const groupObj = this.groups.find((x) => x.egId === this.groupId);
      this.userForm.get('group')?.setValue(groupObj);
      this.onGroupChange();
      this.displayUserRegistration = true;
      this.formMode = true;
    } else {
      this.toaster.error('Alert!', 'you do not have permission to access');
    }
  }
  getUsers(): void {
    this.spinner.show();
    const key = {
      egId: JSON.parse(localStorage.user).egId,
    };
    this.userService.getUsers(key).subscribe(
      (users) => {
        this.userData = new MatTableDataSource<Userlist>(users);

        this.getPaginator();
        this.spinner.hide();
      },
      (error) => {
        this.toaster.error('Error', error.message);
        this.spinner.hide();
      }
    );
  }
  expandAll(): any {
    this.machineTree.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll(): any {
    this.machineTree.forEach(node => {
      this.expandRecursive(node, false);
    });
  }
  private expandRecursive(node: TreeNode, isExpand: boolean): any {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
  userMachineAccess(): void {
    let componentdata: any[] = []; let plantdata: any[] = [];
    let divisondata: any[] = []; let departmentdata: any[] = []; let unitdata: any[] = []; let assemblydata: any[] = [];
    let subassemblydata: any[] = []; let linedata: any[] = [];
    componentdata = this.selectedMachine.filter((e: any) => e.Level === 'Component').map((x: any) => x.TableId);
    plantdata = this.selectedMachine.filter((e: any) => e.Level === 'Plant').map((x: any) => x.TableId);
    divisondata = this.selectedMachine.filter((e: any) => e.Level === 'Division').map((x: any) => x.TableId);
    departmentdata = this.selectedMachine.filter((e: any) => e.Level === 'Department').map((x: any) => x.TableId);
    unitdata = this.selectedMachine.filter((e: any) => e.Level === 'Unit').map((x: any) => x.TableId);
    assemblydata = this.selectedMachine.filter((e: any) => e.Level === 'Assembly').map((x: any) => x.TableId);
    subassemblydata = this.selectedMachine.filter((e: any) => e.Level === 'SubAssembly').map((x: any) => x.TableId);
    linedata = this.selectedMachine.filter((e: any) => e.Level === 'Line').map((x: any) => x.TableId);

    const json = {
      componentdata:  componentdata.filter((n: any, i: any) => componentdata.indexOf(n) === i).toString(),
      plantdata : plantdata.filter((n: any, i: any) => plantdata.indexOf(n) === i).toString(),
      divisondata :  divisondata.filter((n: any, i: any) => divisondata.indexOf(n) === i).toString(),
      departmentdata :  departmentdata.filter((n: any, i: any) => departmentdata.indexOf(n) === i).toString(),
      unitdata :  unitdata.filter((n: any, i: any) => unitdata.indexOf(n) === i).toString(),
      assemblydata :  assemblydata.filter((n: any, i: any) => assemblydata.indexOf(n) === i).toString(),
      subassemblydata :  subassemblydata.filter((n: any, i: any) => subassemblydata.indexOf(n) === i).toString(),
      linedata :  linedata.filter((n: any, i: any) => linedata.indexOf(n) === i).toString(),
      userId: this.userId,
      createdBy:  JSON.parse(localStorage.user).userId,
    };
    this.userService.saveMachineAccess(json).subscribe((respose: any) => {
        this.machineForm.reset();
        this.displayMachineDailog = false;
        this.toaster.success('Success', 'User Machine Permission Successfull');
      },
      (error: any) => {
        this.toaster.error('Error', error.message);
      }
    );
  }
  register(): void {
    const formdata = new FormData();
    formdata.append('image', this.fileSave);
    const plantArray: number[] = [];
    const roleArray: number[] = [];
    // this.userForm.value.plant.forEach((plant: { ptId: any }) => {
    //   plantArray.push(plant.ptId);
    // });
    if (this.userForm.value.role !== null) {
      this.userForm.value.role.forEach((role: { roleId: any }) => {
        roleArray.push(role.roleId);
      });
    }
    const registeruser = {
      userName: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      phoneNumber: this.userForm.value.phoneNumber,
      roleId: roleArray,
      plant: plantArray,
      egId: this.userForm.value.group.egId,
    };
    formdata.append('registeruser', JSON.stringify(registeruser));
    this.userService.registerUser(formdata).subscribe(
      (respose: any) => {
        this.getUsers();
        this.resetForm();
        this.imageSrc = '';
        // this.modalService.dismissAll();
        this.displayUserRegistration = false;
        this.toaster.success('Success', 'User Registration Successfull');
      },
      (error: any) => {
        this.toaster.error('Error', error.error.message);
      }
    );
  }
  updateUser(): void {
    const formdata = new FormData();
    formdata.append('image', this.fileSave);
    const plantArray: number[] = [];
    const roleArray: number[] = [];
    if (this.userForm.value.role.length > 0) {
      this.userForm.value.role.forEach((role: { roleId: any }) => {
        roleArray.push(role.roleId);
      });
    }
    const registeruser = {
      userName: this.userForm.value.username,
      email: this.userForm.value.email,
      // password: this.userForm.value.password,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      phoneNumber: this.userForm.value.phoneNumber,
      roleId: roleArray,
      plant: plantArray,
      egId: this.userForm.value.group.egId,
      userId: this.userId,
    };

    formdata.append('registeruser', JSON.stringify(registeruser));
    this.userService.updateUser(formdata).subscribe(
      (respose: any) => {
        this.getUsers();
        this.resetForm();
        // this.modalService.dismissAll();
        this.displayUserRegistration = false;
        this.toaster.success('Success', 'User Registration Successfull');
      },
      (error: any) => {
        this.toaster.error('Error', error.message);
      }
    );
  }

  getPlantsOfUser(userId: any): void {
    const key = {
      userId,
    };
    this.userService.getUserPants(key).subscribe(
      (response) => {
        this.userPlants = response;
      },
      (error) => {
        this.toaster.error('Error', error.message);
      }
    );
  }
  searchUserPermissions(): void {
    this.plantId = this.userPermissionForm.value.plant;
    const data = {
      userId: this.userId,
      // plantId: this.userPermissionForm.value.plant,
    };
    this.getUserPersmissions(data);
    this.userPermissionForm.get('plant')?.setValue('');
  }
  setSelectedNodesOnSearch(node: any): any{
    this.selectedNodePermission.push(node);
    const allSelectedChildNodes = node.children.filter( (child: any) =>  child.data.IsSelect );
    if (allSelectedChildNodes.length) {
      // this.selectedNodes3 = this.selectedNodes3.concat(allSelectedChildNodes);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < allSelectedChildNodes.length; i++) {
        this.setSelectedNodesOnSearch(allSelectedChildNodes[i]);
      }
    }
  }
  getUserPersmissions(data: any): any {
    this.spinner.show();
    this.userService.userPermissions(data).subscribe(
      (response) => {
        this.userPersmissions = response;
        this.files5 = arrayToTree(response);
        this.selectedNodePermission = [];
        const seletedData = arrayToTree(response);
        if (seletedData.length) {
          seletedData.forEach(element => {
            this.selectedNodePermission =  this.selectedNodePermission.concat(this.userService.getSelectedNodesFlatArray(element));
          });
        }
        this.spinner.hide();
      },
      (error) => {
        this.toaster.error('Error', error.message);
        this.spinner.hide();
      }
    );
  }

  selectionChange(event: any, menuId: number): any {
    const m = this.userPersmissions.find((x) => x.MenuId === menuId);
    if (m?.IsSelect === true) {
      m.IsSelect = true;
      m.IsRead = true;
      m.IsCreate = true;
      m.IsUpdate = true;
      m.IsDelete = true;
      m.IsApprove = true;
      m.IsPrint = true;
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
    const m = this.userPersmissions.find((x) => x.MenuId === menuId);
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

  readChange(event: any, menuId: number): void {
    const m = this.userPersmissions.find((x) => x.MenuId === menuId);
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
    const m = this.userPersmissions.find((x) => x.MenuId === menuId);
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
    const m = this.userPersmissions.find((x) => x.MenuId === menuId);
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
    const m = this.userPersmissions.find((x) => x.MenuId === menuId);
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
    const m = this.userPersmissions.find((x) => x.MenuId === menuId);
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
    const m = this.userPersmissions.find((x) => x.MenuId === menuId);
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
    if (this.userPersmissions.length > 0) {
      const seletedPemissions = Array.from(new Set(this.selectedNodePermission.map((x: any) => x.data.id)))
      .map(id => {
        return {
          data: this.selectedNodePermission.find((node: any) => node.data.id === id).data,
        };
      });
      const permissionslist = seletedPemissions.filter(
        x => x.data.IsSelect === true
      ).map(x => x.data);
      const data = {
        search: {
          userId: this.userId,
          egId: JSON.parse(localStorage.user).egId,
        },
        menuArray: permissionslist,
      };
      this.userService.updateUserPermissions(data).subscribe(
        (response) => {
          this.toaster.success('Success', 'Data Saved Successfuly');
          // this.modalService.dismissAll();
          console.log(this.selectedNodePermission);
          this.displayUserPermission = false;
        },
        (error) => {
          this.toaster.error('Error', error.message);
        }
      );
    } else {
      this.toaster.info('Warning', 'Please Select Plant for Search Menu');
    }
  }
  resetForm(): void {
    this.userForm.reset();
  }
  onHeaderCheckboxToggle(event: any): any {
    if (event.checked){
      this.selectedNodePermission = [];
      this.selectedNodePermission = arrayToTree(this.userPersmissions);
      arrayToTree(this.userPersmissions).forEach(element => {
        this.selectAllNodesByHeader(element , true);
        this.setSelectedNodesOnSearch(element);
      });
      console.log(this.selectedNodePermission);
    }else{
      this.selectedNodePermission = [];
      arrayToTree(this.userPersmissions).forEach(element => {
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
        this.selectAllNodesByHeader( node.children[i] , true);
        }else{
          this.selectAllNodesByHeader( node.children[i] , false);
        }
      }
    }
  }
  checkAllPermission(event: any, menuId: number): void {
    const m = this.userPersmissions.find((x) => x.MenuId === menuId);
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
    const m = this.userPersmissions.find((x) => x.MenuId === menuId);
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
  nodeSelect(event: any): any {
    // this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    // this.selectionChange(event , event.node.data.MenuId);
    this.chekNode([event.node], event.node.data.id);
    // this.selectedNodePermission.push(event.node.parent);
  }
  chekNode(data: any, id: any): any {
    data.forEach((o: any, i: any): any => {
      if (o.data.id && o.data.id === id) {
        this.selectionChange(i , id);
        this.recursive(o.children, true);
      }
    });
  }
  recursive(childrenArray: any, type: boolean): any{
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < childrenArray.length; index++) {
      const child = childrenArray[index];
      if (type) {
        this.selectionChange([child] , child.data.id);
      }else{
        this.unselectionChange([child] , child.data.id);
      }
      // this.selectionChange([child] , child.data.id);
      if (child.children.length) {
        this.recursive(child.children, type);
      }
    }
  }
  unchekNode(data: any, id: any): any {
    data.forEach((o: any, i: any): any => {
      if (o.data.id && o.data.id === id) {
        this.unselectionChange(i , id);
        // tslint:disable-next-line:prefer-for-of
        this.recursive(o.children, false);
      }
    });
  }

  nodeUnselect(event: any): any {
    this.unchekNode([event.node], event.node.data.id);
  }
  checkNode(nodes: any, str: string[]): any {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i].leaf && nodes[i].children[0].leaf) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < nodes[i].children.length; j++) {
          if (str.includes(nodes[i].children[j].id)) {
            if (!this.selectedMachine.includes(nodes[i].children[j])) {
              this.selectedMachine.push(nodes[i].children[j]);
            }
          }
        }
      }
      if (nodes[i].leaf) {
        return;
      }
      this.checkNode(nodes[i].children, str);
      const count = nodes[i].children.length;
      let c = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < nodes[i].children.length; j++) {
        if (this.selectedMachine.includes(nodes[i].children[j])) {
          c++;
        }
        if (nodes[i].children[j].partialSelected) { nodes[i].partialSelected = true; }
      }
      if (c === 0) { }
      else if (c === count) {
        nodes[i].partialSelected = false;
        if (!this.selectedMachine.includes(nodes[i])) {
          this.selectedMachine.push(nodes[i]);
        }
      }
      else {
        nodes[i].partialSelected = true;
      }
    }
  }
}
