import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineParametersComponent } from './machine-parameters.component';

describe('MachineParametersComponent', () => {
  let component: MachineParametersComponent;
  let fixture: ComponentFixture<MachineParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
