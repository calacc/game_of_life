import { Routes } from '@angular/router'

import { Roles } from '../../shared/enums/Roles'
import { GameChartsComponent } from '../analytics-feature/game-charts/game-charts.component'
import { CellChartsComponent } from '../analytics-feature/cell-charts/cell-charts.component'
import { GamesTableComponent } from '../table-feature/games-table/games-table.component'
import { CellsTableComponent } from '../table-feature/cells-table/cells-table.component'

export const mainRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./main-feature.component').then(
                (m) => m.MainFeatureComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./components/main-page/main-page.component').then(
                        (m) => m.MainPageComponent
                    ),
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import(
                                './components/home-page/home-page.component'
                            ).then((m) => m.HomePageComponent),
                    },
                    {
                        path: 'basic',
                        loadChildren: () =>
                            import(
                                '../basic-feature/basic-feature.routes'
                            ).then((m) => m.basicFeatureRoutes),
                    },

                    {
                        path: 'analytics',
                        loadComponent: () =>
                            import(
                                '../analytics-feature/analytics-feature.component'
                            ).then((m) => m.AnalyticsFeatureComponent),
                        children: [
                            {
                                path: 'games',
                                component: GameChartsComponent,
                            },
                            {
                                path: 'cells',
                                component: CellChartsComponent,
                            },
                        ],
                    },
                    {
                        path: 'table',
                        loadComponent: () =>
                            import(
                                '../table-feature/table-feature.component'
                            ).then((m) => m.TableFeatureComponent),
                        children: [
                            {
                                path: 'games',
                                component: GamesTableComponent,
                            },
                            {
                                path: 'cells',
                                component: CellsTableComponent,
                            },
                        ],
                    },
                    {
                        path: 'advanced',
                        loadChildren: () =>
                            import(
                                '../advanced-feature/advanced-feature.routes'
                            ).then((m) => m.advancedFeatureRoutes),
                    },
                    {
                        path: 'settings',
                        loadComponent: () =>
                            import(
                                '../settings-feature/settings-feature.component'
                            ).then((m) => m.SettingsFeatureComponent),
                    },
                ],
            },
        ],
    },
]
