import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AppStore } from '../../stores/app.store'
import { of, switchMap } from 'rxjs'

export const isNotAuthGuard: CanActivateFn = () => {
    console.log('[Guard] IsNotAuthGuard runs')
    const appStore = inject(AppStore)
    const router = inject(Router)
    return appStore.state$.pipe(
        switchMap((state) => {
            if (state.loggedIn) {
                console.log('[Guard] IsNotAuthGuard fail')
                return of(router.parseUrl(''))
            } else {
                console.log('[Guard] IsNotAuthGuard success')
                return of(true)
            }
        })
    )
}
