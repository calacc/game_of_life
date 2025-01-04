import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { ActiveTabStore } from '../../../../core/stores/active-tab.store'
import { delay } from 'rxjs'
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs'
import { AsyncPipe } from '@angular/common'
import { fadeInAnimation } from '../../../../app.animations'

@Component({
    selector: 'app-tabs-navigation-page',
    standalone: true,
    imports: [MatTabNav, MatTabLink, MatTabNavPanel, RouterOutlet, AsyncPipe],
    templateUrl: './drawer-navigation-page.component.html',
    styleUrl: './drawer-navigation-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
    providers: [ActiveTabStore],
})
export class DrawerNavigationPageComponent {
    private readonly router = inject(Router)
    private readonly activeTabStore = inject(ActiveTabStore)

    activeTab$ = this.activeTabStore.name$.pipe(delay(0))

    goTo(url: string, activeTab: string) {
        this.activeTabStore.setActiveTab(activeTab)
        return this.router.navigateByUrl(url)
    }
}
