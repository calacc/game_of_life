import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChartsComponent } from './game-charts.component';

describe('GameChartsComponent', () => {
  let component: GameChartsComponent;
  let fixture: ComponentFixture<GameChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
