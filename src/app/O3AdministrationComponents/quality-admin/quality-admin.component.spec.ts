import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAdminComponent } from './quality-admin.component';

describe('QualityAdminComponent', () => {
  let component: QualityAdminComponent;
  let fixture: ComponentFixture<QualityAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
