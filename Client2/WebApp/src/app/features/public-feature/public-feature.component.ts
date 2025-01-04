import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
    selector: 'app-public-feature',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './public-feature.component.html',
    styleUrl: './public-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicFeatureComponent {}
