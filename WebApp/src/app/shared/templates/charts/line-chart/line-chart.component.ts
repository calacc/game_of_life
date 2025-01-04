import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent {

}
