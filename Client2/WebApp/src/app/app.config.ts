import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import {
    PreloadAllModules,
    provideRouter,
    withInMemoryScrolling,
    withPreloading,
    withRouterConfig,
} from '@angular/router'

import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { jwtInterceptor } from './core/http/interceptors/jwt.interceptor'

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([jwtInterceptor])),
        provideRouter(
            routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'top',
                anchorScrolling: 'enabled',
            }),
            withRouterConfig({
                urlUpdateStrategy: 'eager',
                onSameUrlNavigation: 'reload',
            }),
            withPreloading(PreloadAllModules),
        ),
    ],
}
