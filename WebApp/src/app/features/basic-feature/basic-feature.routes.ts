import { Routes } from '@angular/router'

export const basicFeatureRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./basic-feature.component').then(
                (m) => m.BasicFeatureComponent
            ),
        children: [
            {
                path: 'components',
                loadComponent: () =>
                    import(
                        './components/components-page/components-page.component'
                    ).then((m) => m.ComponentsPageComponent),
            },
            {
                path: 'form',
                loadComponent: () =>
                    import(
                        './components/basic-form-page/basic-form-page.component'
                    ).then((m) => m.BasicFormPageComponent),
            },
            {
                path: 'media',
                loadComponent: () =>
                    import('./components/media-page/media-page.component').then(
                        (m) => m.MediaPageComponent
                    ),
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'form',
            },
        ],
    },
]
