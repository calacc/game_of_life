import {
    APP_INITIALIZER,
    ApplicationConfig,
    Provider,
    provideZoneChangeDetection,
} from '@angular/core'
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
import {
    Overlay,
    ScrollStrategy,
    ScrollStrategyOptions,
} from '@angular/cdk/overlay'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { loggerInterceptor } from './core/http/interceptors/logger.interceptor'
import { errorInterceptor } from './core/http/interceptors/error.interceptor'
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete'
import { MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select'

export function customScrollStrategyFactory(
    overlay: Overlay
): () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition()
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimationsAsync(),
        provideHttpClient(
            withInterceptors([
                loggerInterceptor,
                jwtInterceptor,
                errorInterceptor,
            ])
        ),
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
            withPreloading(PreloadAllModules)
        ),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'fill' },
        },
    ],
}

const scrollStrategyConfigs = [
    {
        provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
        useFactory: (scrollStrategyOptions: ScrollStrategyOptions) =>
            scrollStrategyOptions.close,
        deps: [ScrollStrategyOptions],
    },
    {
        provide: MAT_SELECT_SCROLL_STRATEGY,
        useFactory: (scrollStrategyOptions: ScrollStrategyOptions) =>
            scrollStrategyOptions.reposition,
        deps: [ScrollStrategyOptions],
    },
    {
        provide: MAT_SELECT_SCROLL_STRATEGY,
        useFactory: customScrollStrategyFactory,
        deps: [Overlay],
    },
]
