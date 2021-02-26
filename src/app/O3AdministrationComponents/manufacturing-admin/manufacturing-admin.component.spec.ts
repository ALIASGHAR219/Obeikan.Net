import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingAdminComponent } from './manufacturing-admin.component';

describe('ManufacturingAdminComponent', () => {
  let component: ManufacturingAdminComponent;
  let fixture: ComponentFixture<ManufacturingAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
