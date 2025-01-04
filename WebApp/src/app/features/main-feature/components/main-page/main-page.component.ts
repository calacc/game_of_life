import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from '@angular/core'
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common'
import { CdkScrollable } from '@angular/cdk/scrolling'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatToolbar } from '@angular/material/toolbar'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { AppState, AppStore } from '../../../../core/stores/app.store'
import { AuthService } from '../../../../core/services/auth/auth.service'
import { DrawerContentService } from '../../../../core/services/drawer-content/drawer-content.service'
import { MatDialog } from '@angular/material/dialog'
import { ActiveDrawerItemStore } from '../../../../core/stores/active-drawer-item.store'
import { delay, Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NavigationDialogComponent } from '../navigation-dialog/navigation-dialog.component'
import { fullscreenDialogConfig } from '../../../../shared/configs/fullscreen-dialog.config'
import { Roles } from '../../../../shared/enums/Roles'
import { fadeInAnimation } from '../../../../app.animations'
import { LogoComponent } from '../../../../shared/components/logo/logo.component'
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component'
import { AppData } from '../../../../shared/enums/AppData'

@Component({
    selector: 'app-main-page',
    standalone: true,
    imports: [
        AsyncPipe,
        CdkScrollable,

        MatButton,
        MatIcon,
        MatIconButton,
        MatToolbar,
        NgIf,
        NgTemplateOutlet,
        RouterOutlet,
        LogoComponent,
        NavigationButtonsComponent,
    ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.scss',
    providers: [DrawerContentService],
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
    private readonly router = inject(Router)
    private readonly destroyRef = inject(DestroyRef)
    private readonly drawerContentService = inject(DrawerContentService)
    private readonly dialog = inject(MatDialog)
    private readonly featureNameStore = inject(ActiveDrawerItemStore)

    featureName$ = this.featureNameStore.name$.pipe(delay(0))

    constructor() {
        this.featureName$.subscribe((featureName) => {})
        let previousUrl: string | null = null
        this.router.events
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
                const currentRoute = this.router.url
                if (event instanceof NavigationEnd) {
                    if (previousUrl === currentRoute) {
                        this.drawerContentService.scrollTopSmooth()
                    } else {
                        this.drawerContentService.scrollTop()
                    }
                    previousUrl = currentRoute
                }
            })
    }

    openNavigationDialog() {
        this.dialog.open(NavigationDialogComponent, fullscreenDialogConfig)
    }

    protected readonly AppData = AppData
}
