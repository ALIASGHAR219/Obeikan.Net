import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDbComponent } from './production-db.component';

describe('ProductionDbComponent', () => {
  let component: ProductionDbComponent;
  let fixture: ComponentFixture<ProductionDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
