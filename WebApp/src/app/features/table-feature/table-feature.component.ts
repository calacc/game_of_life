import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActiveDrawerItemStore } from '../../core/stores/active-drawer-item.store'
import { Router, RouterOutlet } from '@angular/router'
import { ActiveTabStore } from '../../core/stores/active-tab.store'
import { AdvancedFeatureStore } from '../../core/stores/advanced-feature.store'
import { AppStore } from '../../core/stores/app.store'
import { ElementService } from '../../core/http/services/element/element.service'
import { BehaviorSubject, delay, of, switchMap, tap } from 'rxjs'
import { AsyncPipe, NgIf } from '@angular/common'
import { ToolbarLoadingPageComponent } from '../../shared/components/toolbar-loading-page/toolbar-loading-page.component'
import { HttpClient } from '@angular/common/http'
import { GameOfLifeDto } from '../../core/http/dto/game-of-life/game-of-life.dto'
import { CellDto } from '../../core/http/dto/game-of-life/cell.dto'
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs'
import { fadeInAnimation } from '../../app.animations'
import { GamesStore } from '../../core/stores/games.store'
import { ChartJsService } from '../../core/services/chart-js/chart-js.service'

@Component({
    selector: 'app-table-feature',
    standalone: true,
    imports: [
        AsyncPipe,
        RouterOutlet,
        ToolbarLoadingPageComponent,
        NgIf,
        MatTabLink,
        MatTabNav,
        MatTabNavPanel,
    ],
    templateUrl: './table-feature.component.html',

    styleUrl: './table-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ActiveTabStore],
    animations: [fadeInAnimation],
})
export class TableFeatureComponent {
    private readonly activeDrawerItem = inject(ActiveDrawerItemStore)
    private readonly router = inject(Router)
    private readonly basicFeatureStore = inject(AdvancedFeatureStore)
    private readonly appStore = inject(AppStore)
    private readonly elementService = inject(ElementService)
    spinner$ = new BehaviorSubject<boolean>(true)
    private readonly http = inject(HttpClient)
    private readonly activeTabStore = inject(ActiveTabStore)
    activeTab$ = this.activeTabStore.name$.pipe(delay(0))
    private readonly gameStore = inject(GamesStore)
    private readonly chartJsService = inject(ChartJsService)

    gameOfLifes: GameOfLifeDto[] = []
    cells: CellDto[] = []

    constructor() {
        this.chartJsService.initializeChartJs()
        this.activeDrawerItem.setFeatureName('Table')
        this.gameStore.init$
            .pipe(
                switchMap((init) => {
                    console.log(init)
                    if (init) {
                        this.spinner$.next(false)
                        return of()
                    } else {
                        this.spinner$.next(true)
                        return this.http.get<GameOfLifeDto[]>(
                            'http://localhost:8080/game-of-life'
                        )
                    }
                }),
                tap((data) => {
                    this.gameOfLifes = data
                    data.forEach((gameOfLife: GameOfLifeDto) => {
                        this.cells.push(...gameOfLife.cells)
                    })
                    this.spinner$.next(false)
                    this.gameStore.initialize({
                        cells: this.cells,
                        games: this.gameOfLifes,
                    })
                })
            )
            .subscribe()
    }
    goTo(url: string, activeTab: string) {
        this.activeTabStore.setActiveTab(activeTab)
        return this.router.navigateByUrl(url)
    }
}
