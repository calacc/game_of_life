import { Routes } from '@angular/router'

export const privateRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./private-feature.component').then(
                (m) => m.PrivateFeatureComponent,
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/loading-page/loading-page.component').then(
                        (m) => m.LoadingPageComponent,
                    ),
            },
            {
                path: 'auth',
                loadChildren: () =>
                    import('../auth-feature/auth.routes').then(
                        (m) => m.authRoutes,
                    ),
            },
            {
                path: 'main',
                loadChildren: () =>
                    import('../main-feature/main.routes').then(
                        (m) => m.mainRoutes,
                    ),
            },
        ],
    },
]
