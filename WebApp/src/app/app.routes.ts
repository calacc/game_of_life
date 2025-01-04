import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: 'private',
        loadChildren: () =>
            import('./features/private-feature/private.routes').then(
                (x) => x.privateRoutes,
            ),
    },

    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'private',
    },
]
