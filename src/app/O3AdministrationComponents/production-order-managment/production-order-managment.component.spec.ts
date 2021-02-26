import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionOrderManagmentComponent } from './production-order-managment.component';

describe('ProductionOrderManagmentComponent', () => {
  let component: ProductionOrderManagmentComponent;
  let fixture: ComponentFixture<ProductionOrderManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionOrderManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionOrderManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
