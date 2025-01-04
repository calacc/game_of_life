import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { MatProgressBar } from '@angular/material/progress-bar'
import { AsyncPipe, NgIf } from '@angular/common'
import { LoadingPageComponent } from './shared/components/loading-page/loading-page.component'

import { AppStore } from './core/stores/app.store'
import { AuthService } from './core/services/auth/auth.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { BehaviorSubject, switchMap } from 'rxjs'
import { fadeInAnimation } from './app.animations'
import { MatIconRegistry } from '@angular/material/icon'
import {
    BarController,
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MatSlideToggle,
        MatProgressBar,
        NgIf,
        AsyncPipe,
        LoadingPageComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    private readonly appStore = inject(AppStore)
    private readonly auth = inject(AuthService)
    loading$ = new BehaviorSubject<boolean>(true)

    constructor(private readonly iconRegistry: MatIconRegistry) {
        const startTime = Date.now()
        this.auth
            .isLoggedIn()
            .pipe(
                switchMap((loggedIn) => {
                    if (loggedIn) {
                        return this.auth.getFirebaseUser()
                    } else {
                        return this.auth.getRedirectResult()
                    }
                }),
                takeUntilDestroyed()
            )
            .subscribe({
                next: (user) => {
                    const timeElapsed = Date.now() - startTime
                    if (user) {
                        this.appStore.logIn(user)
                    }

                    if (timeElapsed < 1500) {
                        setTimeout(() => {
                            this.loading$.next(false)
                        }, 1500 - timeElapsed)
                    } else {
                        this.loading$.next(false)
                    }
                },
                error: () => {
                    const timeElapsed = Date.now() - startTime
                    this.auth.logOut()
                    if (timeElapsed < 1500) {
                        setTimeout(() => {
                            this.loading$.next(false)
                        }, 1500 - timeElapsed)
                    } else {
                        this.loading$.next(false)
                    }
                },
            })
        const defaultFontSetClasses = iconRegistry.getDefaultFontSetClass()
        const outlinedFontSetClasses = defaultFontSetClasses
            .filter((fontSetClass) => fontSetClass !== 'material-icons')
            .concat(['material-symbols-rounded'])
        iconRegistry.setDefaultFontSetClass(...outlinedFontSetClasses)
    }
}
