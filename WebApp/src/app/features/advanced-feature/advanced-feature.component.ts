import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActiveDrawerItemStore } from '../../core/stores/active-drawer-item.store'
import { fadeInAnimation } from '../../app.animations'
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs'
import { Router, RouterOutlet } from '@angular/router'
import { BehaviorSubject, delay, of, switchMap, tap } from 'rxjs'
import { ActiveTabStore } from '../../core/stores/active-tab.store'
import { AsyncPipe, NgIf } from '@angular/common'
import { ToolbarLoadingPageComponent } from '../../shared/components/toolbar-loading-page/toolbar-loading-page.component'
import { AdvancedFeatureStore } from '../../core/stores/advanced-feature.store'
import { AppStore } from '../../core/stores/app.store'
import { ElementService } from '../../core/http/services/element/element.service'
import { ChartJsService } from '../../core/services/chart-js/chart-js.service'

@Component({
    selector: 'app-advanced-feature',
    standalone: true,
    imports: [
        MatTabNav,
        MatTabLink,
        MatTabNavPanel,
        RouterOutlet,
        AsyncPipe,
        NgIf,
        ToolbarLoadingPageComponent,
    ],
    templateUrl: './advanced-feature.component.html',
    styleUrl: './advanced-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ActiveTabStore, ChartJsService],
    animations: [fadeInAnimation],
})
export class AdvancedFeatureComponent {
    private readonly activeDrawerItem = inject(ActiveDrawerItemStore)
    private readonly router = inject(Router)
    private readonly activeTabStore = inject(ActiveTabStore)
    private readonly basicFeatureStore = inject(AdvancedFeatureStore)
    private readonly appStore = inject(AppStore)
    private readonly elementService = inject(ElementService)
    spinner$ = new BehaviorSubject<boolean>(true)
    activeTab$ = this.activeTabStore.name$.pipe(delay(0))

    constructor() {
        // this.activeDrawerItem.setFeatureName('Advanced')
        // this.basicFeatureStore.init$
        //     .pipe(
        //         switchMap((data) => {
        //             if (data) {
        //                 this.spinner$.next(false)
        //                 return of()
        //             } else {
        //                 this.spinner$.next(true)
        //                 return this.appStore.user$.pipe(
        //                     switchMap((user) => {
        //                         return this.elementService
        //                             .getElementDataByUserId(user.id)
        //                             .pipe(
        //                                 tap((data) => {
        //                                     this.basicFeatureStore.initialize(
        //                                         data
        //                                     )
        //                                 })
        //                             )
        //                     })
        //                 )
        //             }
        //         })
        //     )
        //     .subscribe({})
    }

    goTo(url: string, activeTab: string) {
        this.activeTabStore.setActiveTab(activeTab)
        return this.router.navigateByUrl(url)
    }
}
