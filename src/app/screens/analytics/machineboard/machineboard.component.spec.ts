/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MachineboardComponent } from './machineboard.component';

describe('MachineboardComponent', () => {
  let component: MachineboardComponent;
  let fixture: ComponentFixture<MachineboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
