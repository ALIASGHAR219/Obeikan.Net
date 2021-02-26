import { ComponentFixture, TestBed } from '@angular/core/testing';

import { O3AdministrationComponent } from './o3-administration.component';

describe('O3AdministrationComponent', () => {
  let component: O3AdministrationComponent;
  let fixture: ComponentFixture<O3AdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ O3AdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(O3AdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
