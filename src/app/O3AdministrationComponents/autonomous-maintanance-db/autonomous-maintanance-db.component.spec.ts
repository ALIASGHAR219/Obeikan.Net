/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AutonomousMaintananceDbComponent } from './autonomous-maintanance-db.component';

describe('AutonomousMaintananceDbComponent', () => {
  let component: AutonomousMaintananceDbComponent;
  let fixture: ComponentFixture<AutonomousMaintananceDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutonomousMaintananceDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutonomousMaintananceDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
