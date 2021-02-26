import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionOrderManagementComponent } from './production-order-management.component';

describe('ProductionOrderManagementComponent', () => {
  let component: ProductionOrderManagementComponent;
  let fixture: ComponentFixture<ProductionOrderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionOrderManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionOrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
