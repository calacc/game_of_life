import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellsTableComponent } from './cells-table.component';

describe('CellsTableComponent', () => {
  let component: CellsTableComponent;
  let fixture: ComponentFixture<CellsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
