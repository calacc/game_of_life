import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core'
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { UserStore } from '../../core/stores/user.store'
import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AsyncPipe, NgIf } from '@angular/common'
import { BasicLoadingPageComponent } from '../../shared/components/basic-loading-page/basic-loading-page.component'
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav'
import { MatIcon } from '@angular/material/icon'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatToolbar } from '@angular/material/toolbar'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatProgressBar } from '@angular/material/progress-bar'
import { AuthService } from '../../core/services/auth/auth.service'

@Component({
    selector: 'app-main-feature',
    standalone: true,
    imports: [
        RouterOutlet,
        AsyncPipe,
        BasicLoadingPageComponent,
        NgIf,
        MatDrawerContainer,
        MatIcon,
        MatIconButton,
        RouterLinkActive,
        MatButton,
        RouterLink,
        MatToolbar,
        MatDrawer,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        MatProgressBar,
    ],
    templateUrl: './main-feature.component.html',
    styleUrl: './main-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFeatureComponent {
    stateReceived$ = new BehaviorSubject<boolean>(false)
    private readonly userStore = inject(UserStore)
    private readonly router = inject(Router)
    private readonly destroyRef = inject(DestroyRef)
    private readonly auth = inject(AuthService)

    constructor() {
        this.userStore.loggedIn$.pipe(takeUntilDestroyed()).subscribe({
            next: (loggedIn) => {
                if (loggedIn !== null) {
                    if (loggedIn) {
                        this.stateReceived$.next(true)
                    }
                    if (!loggedIn) {
                        this.router.navigate(['/private/auth'])
                    }
                }
            },
        })
        this.router.events
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    // these elements have their own scrollbar -> we need to manually scroll it up, it can't be detected by angular scroll position restoration
                    document
                        .getElementsByTagName('mat-drawer-content')[0]
                        .scrollTo(0, 0)
                    // let elem = document.getElementById('main-content')
                    // if (elem) {
                    //     elem.scrollTo(0, 0)
                    // }
                }
            })
    }

    logout() {
        this.auth.logOut()
        this.userStore.logOut()
        return this.router.navigate(['/private/auth/login'])
    }

    goTo(drawer: MatDrawer, path: string) {
        this.router.navigate([path]).then((x) => {
            drawer.close()
        })
    }
}
