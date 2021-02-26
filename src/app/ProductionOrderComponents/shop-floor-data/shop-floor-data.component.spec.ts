import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFloorDataComponent } from './shop-floor-data.component';

describe('ShopFloorDataComponent', () => {
  let component: ShopFloorDataComponent;
  let fixture: ComponentFixture<ShopFloorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopFloorDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFloorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
