import { Component, OnInit } from '@angular/core';
import { KpimasterService } from 'src/app/services/kpimaster.service';
import { Router } from '@angular/router';
import { CardItem } from 'src/app/models/uimodels/cardItem';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  homeCardList!: CardItem[];
  constructor(public router: Router, private kpiMaster: KpimasterService) {}

  ngOnInit(): void {
    const list = localStorage.getItem('flatMenuItem');
    const treeData = list !== null ? JSON.parse(list) : [];
    this.homeCardList = [
      { title: 'Production DB', routerLink: '/production-db', icon: 'assets/images/production-order-management.svg',
       disabled: this.kpiMaster.isMenuEnabled(treeData, 'Production DB') },
       { title: 'Machine Board', routerLink: '/machineboard', icon: 'assets/images/production-order-management.svg',
       disabled: this.kpiMaster.isMenuEnabled(treeData, 'Machine Board') },
    ];
  }

}
