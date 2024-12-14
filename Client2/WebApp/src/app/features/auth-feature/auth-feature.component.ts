import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { UserStore } from '../../core/stores/user.store'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AsyncPipe, NgIf } from '@angular/common'
import { BasicLoadingPageComponent } from '../../shared/components/basic-loading-page/basic-loading-page.component'
import { AuthFeatureStore } from './stores/auth-feature.store'
import { getAuth } from 'firebase/auth'
import { FirebaseService } from '../../core/services/firebase/firebase.service'
import { UserService } from '../../core/http/services/user/user.service'
import { ErrorService } from '../../core/services/error/error.service'

@Component({
    selector: 'app-auth-feature',
    standalone: true,
    imports: [RouterOutlet, NgIf, AsyncPipe, BasicLoadingPageComponent],
    templateUrl: './auth-feature.component.html',
    styleUrl: './auth-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeatureComponent {
    stateReceived$ = new BehaviorSubject<boolean>(false)

    private readonly userStore = inject(UserStore)
    private readonly router = inject(Router)
    private readonly authStore = inject(AuthFeatureStore)
    redirectResultReceived$ = this.authStore.redirectResultReceived$
    private readonly userService = inject(UserService)
    private readonly destroyRef = inject(DestroyRef)
    private readonly errorService = inject(ErrorService)
    private readonly firebase = inject(FirebaseService)
    private readonly firebaseAuth = getAuth(this.firebase.getApp())

    constructor() {
        this.userStore.loggedIn$.pipe(takeUntilDestroyed()).subscribe({
            next: (loggedIn) => {
                if (loggedIn !== null) {
                    if (loggedIn) {
                        this.router.navigate(['/private/main'])
                    }
                    if (!loggedIn) {
                        this.stateReceived$.next(true)
                    }
                }
            },
        })
    }
    // ngOnInit(): void {
    //     from(getRedirectResult(this.firebaseAuth))
    //         .pipe(
    //             switchMap((result) => {
    //                 this.authStore.redirectResultReceived()
    //                 console.log(result)
    //                 if (result) {
    //                     localStorage.setItem(
    //                         'refresh',
    //                         result.user.refreshToken
    //                     )
    //                     return from(result.user.getIdToken()).pipe(
    //                         switchMap((result) => {
    //                             console.log(result)
    //                             localStorage.setItem('access', result)
    //                             return this.userService.getByToken()
    //                         })
    //                     )
    //                 } else {
    //                     return throwError(() => new Error('next'))
    //                 }
    //             })
    //         )
    //         .pipe(takeUntilDestroyed(this.destroyRef))
    //         .subscribe({
    //             next: (userDto) => {
    //                 this.userStore.logIn(userDto)
    //                 this.router.navigateByUrl('/private/main')
    //             },
    //             error: (error) => {
    //                 if (error.message !== 'next') {
    //                     this.errorService.handleError(error)
    //                 }
    //             },
    //         })
    // }
}
