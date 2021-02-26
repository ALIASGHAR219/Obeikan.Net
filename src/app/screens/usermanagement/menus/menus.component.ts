import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Menu } from '../../../models/menu';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';


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
  formMode = true;
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
  displayMenuRegistration = false;
  menuId!: number;
  parents!: any[];
  menus!: any[];
  menuData!: MatTableDataSource<Menu>;
  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private fb: FormBuilder,
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

  getMenuData(): void {
  }

  openModal(): void {
      this.displayMenuRegistration = true;
  }

  getPaginator(): void {
    setTimeout(() => {
      this.menuData.paginator = this.paginator;
      this.menuData.sort = this.sort;
    }, 1000);
  }

  getOneMenu(data: any): void {
  }

  onSubmit(): void {
  }

  updateMenu(): void {

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
