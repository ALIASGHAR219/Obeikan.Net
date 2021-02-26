import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeeConfigurationComponent } from './oee-configuration.component';

describe('OeeConfigurationComponent', () => {
  let component: OeeConfigurationComponent;
  let fixture: ComponentFixture<OeeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OeeConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OeeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
