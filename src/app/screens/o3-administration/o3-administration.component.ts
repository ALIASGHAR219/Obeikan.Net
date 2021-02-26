import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { arrayToTree } from 'performant-array-to-tree';
import { UserManu } from 'src/app/models/userManu';
import { KpimasterService } from 'src/app/services/kpimaster.service';

@Component({
  selector: 'app-o3-administration',
  templateUrl: './o3-administration.component.html',
  styleUrls: ['./o3-administration.component.scss']
})
export class O3AdministrationComponent implements OnInit {
  administrationlist!: any[];
  userMenu!: UserManu[];
  constructor(private router: Router, private kpiMaster: KpimasterService) { }

  ngOnInit(): void {
    const list = localStorage.getItem('flatMenuItem');
    const treeData = list !== null ? JSON.parse(list) : [];

    this.administrationlist = [
      { title: 'Manufacturing Admin', routerLink: this.getManufacturingAdmin,
        icon: 'assets/images/manufacturing-admin.svg', disabled: false },
      // tslint:disable-next-line:max-line-length
      // { title: 'KPI’s Admin', routerLink: this.getKpisAdmin, icon: 'assets/images/kpi-admin.svg', disabled: this.kpiMaster.isMenuEnabled(treeData, 'KPI\'s Admin') },
      // tslint:disable-next-line:max-line-length
      { title: 'Quality Admin', routerLink: this.getQualityAdmin, icon: 'assets/images/quality-admin.svg', disabled: false },
      // tslint:disable-next-line:max-line-length
      { title: 'General Settings', routerLink: this.getGeneralSettings , icon: 'assets/images/general-settings.svg', disabled: false },
      // tslint:disable-next-line:max-line-length
      { title: 'Master Data Upload', routerLink: this.getMasterDataUpload , icon: 'assets/images/master-data-upload.svg', disabled: false },
      // tslint:disable-next-line:max-line-length
      { title: 'User Management', routerLink: this.getUserManagement, icon: 'assets/images/kpi-management.svg', disabled: false  }
    ];
  }

  getManufacturingAdmin = (): void => {
    this.router.navigate(['/manufacturingadmin']);
  }
  getKpisAdmin = (): void => {
    this.router.navigate(['/kpisadmin']);
  }
  getQualityAdmin = (): void => {
    this.router.navigate(['/qualityadmin']);
  }
  getGeneralSettings = (): void => {
    this.router.navigate(['/generalsettings']);
  }
  getMasterDataUpload = (): void => {
    this.router.navigate(['/masterdataupload']);
  }
  getUserManagement = (): void => {
    this.router.navigate(['/usermanagement']);
  }

}
