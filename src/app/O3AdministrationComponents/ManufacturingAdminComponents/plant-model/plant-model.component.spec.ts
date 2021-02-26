import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantModelComponent } from './plant-model.component';

describe('PlantModelComponent', () => {
  let component: PlantModelComponent;
  let fixture: ComponentFixture<PlantModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
