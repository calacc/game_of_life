import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AppStore } from '../../stores/app.store'
import { of, switchMap } from 'rxjs'

export const isAuthGuard: CanActivateFn = () => {
    console.log('[Guard] IsAuthGuard runs')
    const appStore = inject(AppStore)
    const router = inject(Router)
    return appStore.state$.pipe(
        switchMap((state) => {
            if (state.loggedIn) {
                console.log('[Guard] IsAuthGuard success')
                return of(true)
            } else {
                console.log('[Guard] IsAuthGuard failed')
                return of(router.parseUrl('/auth'))
            }
        })
    )
}
