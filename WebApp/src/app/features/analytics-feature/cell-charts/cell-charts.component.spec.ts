import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellChartsComponent } from './cell-charts.component';

describe('CellChartsComponent', () => {
  let component: CellChartsComponent;
  let fixture: ComponentFixture<CellChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
