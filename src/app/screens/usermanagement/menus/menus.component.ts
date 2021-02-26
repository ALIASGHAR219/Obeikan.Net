import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Menu } from "../../../models/menu";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { UsermanagementService } from "../../../services/usermanagement.service";


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MenusComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<Menu>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  MenuForm!: FormGroup;
  formMode: boolean = true;
  menuColumns: string[] = [
    'menuId',
    'menuname',
    'parentname',
    'action',
    'path',
    'menuActions'
  ];
  // tslint:disable-next-line: ban-types
  FormMode!: Boolean;
  displayMenuRegistration: boolean = false;
  menuId!: number;
  parents!: any[];
  menus!: any[];
  

  menuData!: MatTableDataSource<Menu>;
  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private userService : UsermanagementService
  ) {
    
   }

  ngOnInit(): void {

    this.MenuForm = this.fb.group({
      menuname: ['', Validators.required],
      action: ['', Validators.required],
      path: [''],
      parentname: ['', Validators.required],
  });

    this.getMenuData();
  }

  getMenuData(): any {
    
    this.userService.getMenuData().subscribe( (data : any) => {
      
      this.menuData = new MatTableDataSource<Menu>(data);

      this.parents = data.map( (x: any) => {
        return x;
      });
      
      this.getPaginator();
    }, (error: any) => {
      this.toaster.error('error', error.error.message);
    })
  }

  openModal() {
      this.displayMenuRegistration = true;
  }

  getPaginator(): void {
    setTimeout(() => {
      this.menuData.paginator = this.paginator;
      this.menuData.sort = this.sort;
    }, 1000);
  }

  getOneMenu(data: any) {
    const key = {
      menuId : data
    }
    this.userService.updateMenuData(key).subscribe( (data : any) => {

    }, (error) => {
      this.toaster.error('error', error.error.message);
    })
  }

  onSubmit(): void {
    const key = {
      menuName : this.MenuForm.value.menuname,
      parentName : this.MenuForm.value.parentname,
      action: this.MenuForm.value.action,
      path : this.MenuForm.value.path
    }
    debugger;
    this.userService.addMenuData(key).subscribe((data: any) => {
      this.toaster.success('Data saved succesfuly');
     
    }, (error: any) => {
      this.toaster.error('Error', error.error.message);
    })
  }

  updateMenu() {

  }

  onFileChange(event: any): any {
    // if (event.target.files.length > 0) {
    //   this.fileSave = event.target.files[0];
    // }
    // const reader = new FileReader();

    // if (event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);

    //   reader.onload = () => {
    //     this.imageSrc = reader.result as string;

    //     this.userForm.patchValue({
    //       fileSource: reader.result,
    //     });
    //   };
    }
  

}
