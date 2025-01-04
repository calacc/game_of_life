import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthFeatureStore } from '../../../core/stores/auth-feature.store'
import { map } from 'rxjs'

export const passwordResetEmailSentGuard: CanActivateFn = () => {
    const authFeatureStore = inject(AuthFeatureStore)
    const router = inject(Router)
    return authFeatureStore.passwordResetEmailSent$.pipe(
        map((result) => {
            if (result) {
                return result
            } else {
                return router.parseUrl('/private/auth/login')
            }
        })
    )
}
