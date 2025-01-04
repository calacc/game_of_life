import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { MatButton } from '@angular/material/button'
import { AsyncPipe, NgIf } from '@angular/common'
import { delay } from 'rxjs'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { PageComponent } from '../../shared/components/page/page.component'
import { LoadingPageComponent } from '../../shared/components/loading-page/loading-page.component'
import { ToolbarLoadingPageComponent } from '../../shared/components/toolbar-loading-page/toolbar-loading-page.component'
import { fadeInAnimation } from '../../app.animations'
import { ActiveDrawerItemStore } from '../../core/stores/active-drawer-item.store'
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs'
import { ActiveTabStore } from '../../core/stores/active-tab.store'

@Component({
    selector: 'app-basic-feature',
    standalone: true,
    imports: [
        PageComponent,
        RouterOutlet,
        MatButton,
        RouterLink,
        AsyncPipe,
        LoadingPageComponent,
        NgIf,
        MatProgressSpinner,
        ToolbarLoadingPageComponent,
        MatTabLink,
        MatTabNav,
        MatTabNavPanel,
    ],
    templateUrl: './basic-feature.component.html',
    styleUrl: './basic-feature.component.scss',
    animations: [fadeInAnimation],
    providers: [ActiveTabStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFeatureComponent {
    private readonly featureNameStore = inject(ActiveDrawerItemStore)
    private readonly router = inject(Router)
    private readonly activeTabStore = inject(ActiveTabStore)

    activeTab$ = this.activeTabStore.name$.pipe(delay(0))

    constructor() {
        this.featureNameStore.setFeatureName('Basic')
    }

    goTo(url: string, activeTab: string) {
        this.activeTabStore.setActiveTab(activeTab)
        return this.router.navigateByUrl(url)
    }
}
