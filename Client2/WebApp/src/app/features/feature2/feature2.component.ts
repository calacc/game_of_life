import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-feature2',
  standalone: true,
  imports: [],
  templateUrl: './feature2.component.html',
  styleUrl: './feature2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Feature2Component {

}
