import { Component, OnInit } from '@angular/core';
import { CardItem } from 'src/app/interface/carditem';

@Component({
  selector: 'app-production-order-managment',
  templateUrl: './production-order-managment.component.html',
  styleUrls: ['./production-order-managment.component.scss']
})
export class ProductionOrderManagmentComponent implements OnInit {

  homeCardList: CardItem[] = [
    { title: 'Order Processing', routerLink: '/order-processing', icon: 'assets/images/order-processing.svg', disabled: false },
    { title: 'Shop Floor Data', routerLink: 'shop-floor-data', icon: 'assets/images/shop-floor-data.svg', disabled: false }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
