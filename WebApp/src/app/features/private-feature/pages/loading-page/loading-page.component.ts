import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { UserStore } from '../../../../core/stores/user.store'
import { Router } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
    BasicLoadingPageComponent,
} from '../../../../shared/components/basic-loading-page/basic-loading-page.component'

@Component({
    selector: 'app-loading-page',
    standalone: true,
    imports: [MatProgressSpinner, BasicLoadingPageComponent],
    templateUrl: './loading-page.component.html',
    styleUrl: './loading-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingPageComponent {
    private readonly userStore = inject(UserStore)
    private readonly router = inject(Router)

    constructor() {
        this.userStore.loggedIn$.pipe(takeUntilDestroyed()).subscribe({
            next: (loggedIn) => {
                if (loggedIn !== null) {
                    if (loggedIn) {
                        this.router.navigate(['/private/main'])
                    }
                    if (!loggedIn) {
                        this.router.navigate(['/private/auth'])
                    }
                }
            },
        })
    }
}
