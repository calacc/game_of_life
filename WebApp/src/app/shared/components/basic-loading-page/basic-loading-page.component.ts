import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
    selector: 'app-basic-loading-page',
    standalone: true,
    imports: [MatProgressSpinner],
    templateUrl: './basic-loading-page.component.html',
    styleUrl: './basic-loading-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLoadingPageComponent {
}
