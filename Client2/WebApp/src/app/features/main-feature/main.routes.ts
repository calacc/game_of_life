import { Routes } from '@angular/router'

export const mainRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./main-feature.component').then(
                (m) => m.MainFeatureComponent,
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/home-page/home-page.component').then(
                        (m) => m.HomePageComponent,
                    ),
            },

        ],
    },
]
