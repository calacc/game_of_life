import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
    selector: 'app-toolbar-loading-page',
    standalone: true,
    imports: [MatProgressSpinner],
    templateUrl: './toolbar-loading-page.component.html',
    styleUrl: './toolbar-loading-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarLoadingPageComponent {}
