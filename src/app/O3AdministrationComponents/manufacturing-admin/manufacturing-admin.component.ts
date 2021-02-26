import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManu } from 'src/app/models/userManu';
@Component({
  selector: 'app-manufacturing-admin',
  templateUrl: './manufacturing-admin.component.html',
  styleUrls: ['./manufacturing-admin.component.scss'],
})
export class ManufacturingAdminComponent implements OnInit {
  manufacturinglist!: any[];
  userMenu!: UserManu[];
  constructor(private router: Router) {}

  ngOnInit(): void {
    const list = localStorage.getItem('result');
    this.userMenu = list !== null ? JSON.parse(list) : [];
    const plantModel = this.userMenu.find(
      (x) => x.ParentName === 'Manufacturing Admin' && x.MenuName === 'Plant Model'
    );
    const machineParametrs = this.userMenu.find(
      (x) => x.ParentName === 'Manufacturing Admin' && x.MenuName === 'Machine Parameters'
    );
    const productDetail = this.userMenu.find(
      (x) => x.ParentName === 'Manufacturing Admin' && x.MenuName === 'Product Detail'
    );
    const dtConfiguration = this.userMenu.find(
      (x) => x.ParentName === 'Manufacturing Admin' && x.MenuName === 'DT Configuration'
    );
    const oeeConfiguration = this.userMenu.find(
      (x) => x.ParentName === 'Manufacturing Admin' && x.MenuName === 'OEE Configuration'
    );
    const cilConfiguration = this.userMenu.find(
      (x) => x.ParentName === 'Manufacturing Admin' && x.MenuName === 'CIL Configuration'
    );
    const defectConfiguration = this.userMenu.find(
      (x) => x.ParentName === 'Manufacturing Admin' && x.MenuName === 'Defect Configuration'
    );
    this.manufacturinglist = [
      {
        title: 'Plant Model',
        routerLink: this.getPlantModel,
        icon: 'assets/images/plant-model.svg',
        disabled: !plantModel?.IsRead,
      },
      {
        title: 'Machine Parameters',
        routerLink: this.getMachineParameters,
        icon: 'assets/images/machine-parameters.svg',
        disabled:  !machineParametrs?.IsRead,
      },
      {
        title: 'Product Detail',
        routerLink: this.getProductDetail,
        icon: 'assets/images/product-detail.svg',
        disabled: !productDetail?.IsRead,
      },
      {
        title: 'DT Configuration',
        routerLink: this.getDTConfiguration,
        icon: 'assets/images/dt-configuration.svg',
        disabled: !dtConfiguration?.IsRead,
      },
      {
        title: 'OEE Configuration',
        routerLink: this.getOEEConfiguration,
        icon: 'assets/images/oee-configuration.svg',
        disabled: !oeeConfiguration?.IsRead,
      },
      {
        title: 'CIL Configuration',
        routerLink: this.getCILConfiguration,
        icon: 'assets/images/cil-configuration.svg',
        disabled: !cilConfiguration?.IsRead,
      },
      {
        title: 'Defect Configuration',
        routerLink: this.getDefectConfiguration,
        icon: 'assets/images/defect-configuration.svg',
        disabled: !defectConfiguration?.IsRead,
      },
    ];
  }

  getPlantModel = (): void => {
    this.router.navigate(['/plantmodel']);
  }
  getMachineParameters = (): void => {
    this.router.navigate(['/machineparameters']);
  }
  getProductDetail = (): void => {
    this.router.navigate(['/productdetail']);
  }
  getDTConfiguration = (): void => {
    this.router.navigate(['/dtconfiguration']);
  }
  getOEEConfiguration = (): void => {
    this.router.navigate(['/oeeconfiguration']);
  }
  getCILConfiguration = (): void => {
    this.router.navigate(['/cilconfiguration']);
  }
  getDefectConfiguration = (): void => {
    this.router.navigate(['/defectconfiguration']);
  }
}
