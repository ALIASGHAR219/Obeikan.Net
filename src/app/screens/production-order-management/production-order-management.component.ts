import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardItem } from 'src/app/models/uimodels/cardItem';

@Component({
  selector: 'app-production-order-management',
  templateUrl: './production-order-management.component.html',
  styleUrls: ['./production-order-management.component.scss']
})
export class ProductionOrderManagementComponent implements OnInit {

  pomArray!: any[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    const list = localStorage.getItem('flatMenuItem');
    const treeData = list !== null ? JSON.parse(list) : [];
    this.pomArray = [
      // tslint:disable-next-line:max-line-length
      { title: 'Order Processing', routerLink: this.getOrderProcessing, icon: 'assets/images/order-processing.svg', disabled: false },
      // tslint:disable-next-line:max-line-length
      { title: 'Shop Floor Data', routerLink: this.getShopFloorData, icon: 'assets/images/shop-floor-data.svg', disabled: false }
    ];
  }

  getOrderProcessing = (): void => {
    this.router.navigate(['/orderprocessing']);
  }
  getShopFloorData = (): void => {
    this.router.navigate(['/shopfloordata']);
  }
}
