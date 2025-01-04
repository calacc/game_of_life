import { Routes } from '@angular/router'

import { AdvancedFeatureComponent } from './advanced-feature.component'

export const advancedFeatureRoutes: Routes = [
    {
        path: '',
        component: AdvancedFeatureComponent,
        children: [
            {
                path: 'table',
                loadComponent: () =>
                    import(
                        './components/advanced-table-page/advanced-table-page.component'
                    ).then((m) => m.AdvancedTablePageComponent),
            },
            {
                path: 'charts',
                loadComponent: () =>
                    import(
                        './components/charts-page/charts-page.component'
                    ).then((m) => m.ChartsPageComponent),
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'table',
            },
        ],
    },
]
