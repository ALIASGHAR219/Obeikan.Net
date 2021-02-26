import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CardItem } from 'src/app/models/uimodels/cardItem';
import { UserManu } from 'src/app/models/userManu';
import { KpimasterService } from 'src/app/services/kpimaster.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // treeData!: any[];
  homeCardList!: CardItem[];
  constructor(public router: Router, private kpiMaster: KpimasterService) {}

  ngOnInit(): void {
    const list = localStorage.getItem('flatMenuItem');
    const treeData = list !== null ? JSON.parse(list) : [];
    this.homeCardList = [
      // tslint:disable-next-line:max-line-length
      // { title: 'O3 Administration', routerLink: '/administration', icon: 'assets/images/o3-administration.svg', disabled: !o3Administration?.IsRead },
      { title: 'O3 Administration', routerLink: '/administration', icon: 'assets/images/o3-administration.svg',
      disabled: false },
      { title: 'Production Order Management', routerLink: '/productionordermanagement', icon: 'assets/images/production-order-management.svg', disabled: false },
      // tslint:disable-next-line:max-line-length
      { title: 'Autonomous Maintenance', routerLink: '/autonomous-maintanance-db', icon: 'assets/images/autonomous-maintenance.svg', disabled: false },
      // tslint:disable-next-line:max-line-length
      { title: 'Progressive Maintenance', routerLink: '/progressive-maintenance', icon: 'assets/images/progressive-maintenance.svg', disabled: false },
      // tslint:disable-next-line: max-line-length
      { title: 'Quality Management', routerLink: '/quality-management', icon: 'assets/images/quality-management.svg', disabled: false },
      // tslint:disable-next-line:max-line-length
      { title: 'Productivity Management', routerLink: '/productivity-management', icon: 'assets/images/productivity-management.svg', disabled: false },
      // tslint:disable-next-line:max-line-length
      { title: 'Safety & Environment', routerLink: '/health-safety-environment', icon: 'assets/images/health-safety-environment.svg', disabled: false },
      // tslint:disable-next-line: max-line-length
      // { title: 'KPI’s Management', routerLink: '/kpimanagement', icon: 'assets/images/kpi-management.svg', disabled: false },
      // tslint:disable-next-line:max-line-length
      { title: 'Performance Management', routerLink: '/performance-management', icon: 'assets/images/performance-management.svg', disabled: false },
      { title: 'Loss Analysis', routerLink: '/loss-analysis', icon: 'assets/images/loss-analysis.svg',
      disabled: false },
      // tslint:disable-next-line: max-line-length
      // { title: 'Analytical Tools', routerLink: '/analytical-tools', icon: 'assets/images/analytical-tools.svg', disabled: this.kpiMaster.isMenuEnabled(treeData, 'Analytical Tools') },
      { title: 'Analytics', routerLink: '/analytics', icon: 'assets/images/analytics.svg',
       disabled: false }
    ];
  }
}
