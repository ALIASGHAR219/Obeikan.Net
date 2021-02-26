import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CilConfigurationComponent } from './cil-configuration.component';

describe('CilConfigurationComponent', () => {
  let component: CilConfigurationComponent;
  let fixture: ComponentFixture<CilConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CilConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CilConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
