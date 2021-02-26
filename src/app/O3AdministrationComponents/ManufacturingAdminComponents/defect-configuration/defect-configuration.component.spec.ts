import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectConfigurationComponent } from './defect-configuration.component';

describe('DefectConfigurationComponent', () => {
  let component: DefectConfigurationComponent;
  let fixture: ComponentFixture<DefectConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
