import { ComponentFixture, TestBed } from '@angular/core/testing';

import { O3PercentageGraphComponent } from './o3-percentage-graph.component';

describe('O3PercentageGraphComponent', () => {
  let component: O3PercentageGraphComponent;
  let fixture: ComponentFixture<O3PercentageGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ O3PercentageGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(O3PercentageGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
