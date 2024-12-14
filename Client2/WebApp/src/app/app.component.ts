import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { MatProgressBar } from '@angular/material/progress-bar'
import { ProgressBarStore } from './core/stores/progress-bar.store'
import { AsyncPipe, NgIf } from '@angular/common'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatSlideToggle, MatProgressBar, NgIf, AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'WebApp'
    private readonly progressBarStore = inject(ProgressBarStore)
    loading$ = this.progressBarStore.loading$
}
