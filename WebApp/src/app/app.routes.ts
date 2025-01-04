import { Routes } from '@angular/router'
import { isNotAuthGuard } from './core/guards/is-not-auth/is-not-auth.guard'
import { isAuthGuard } from './core/guards/is-auth/is-auth.guard'

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [isNotAuthGuard],
        loadChildren: () =>
            import('./features/auth-feature/auth.routes').then(
                (m) => m.authRoutes
            ),
    },
    {
        path: '',
        canActivate: [isAuthGuard],
        loadChildren: () =>
            import('./features/main-feature/main.routes').then(
                (m) => m.mainRoutes
            ),
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
    },
]
