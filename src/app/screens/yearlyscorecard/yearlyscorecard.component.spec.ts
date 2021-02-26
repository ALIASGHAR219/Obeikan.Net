import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyscorecardComponent } from './yearlyscorecard.component';

describe('YearlyscorecardComponent', () => {
  let component: YearlyscorecardComponent;
  let fixture: ComponentFixture<YearlyscorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlyscorecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyscorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
