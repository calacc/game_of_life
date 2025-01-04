import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent {

}
