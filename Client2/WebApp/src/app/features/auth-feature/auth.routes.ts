import { Routes } from '@angular/router'
import { passwordResetEmailSentGuard } from './guards/password-reset-email-sent.guard'

export const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./auth-feature.component').then(
                (m) => m.AuthFeatureComponent,
            ),
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./pages/login-page/login-page.component').then(
                        (m) => m.LoginPageComponent,
                    ),
            },
            {
                path: 'signup',
                loadComponent: () =>
                    import('./pages/signup-page/signup-page.component').then(
                        (m) => m.SignupPageComponent,
                    ),
            },
            {
                path: 'reset-password',
                loadComponent: () =>
                    import(
                        './pages/reset-password-page/reset-password-page.component'
                        ).then((m) => m.ResetPasswordPageComponent),
            },
            {
                path: 'reset-password-success',
                canActivate: [passwordResetEmailSentGuard],
                loadComponent: () =>
                    import(
                        './pages/reset-password-success-page/reset-password-success-page.component'
                        ).then((m) => m.ResetPasswordSuccessPageComponent),
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'login',
            },
        ],
    },
]
