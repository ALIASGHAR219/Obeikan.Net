import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtConfigurationComponent } from './dt-configuration.component';

describe('DtConfigurationComponent', () => {
  let component: DtConfigurationComponent;
  let fixture: ComponentFixture<DtConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
