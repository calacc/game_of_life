import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FirebaseService } from '../../core/services/firebase/firebase.service'
import { AuthService } from '../../core/services/auth/auth.service'
import { UserService } from '../../core/http/services/user/user.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { UserStore } from '../../core/stores/user.store'
import { getAuth } from 'firebase/auth'

@Component({
    selector: 'app-private-feature',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './private-feature.component.html',
    styleUrl: './private-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateFeatureComponent {
    private readonly firebase = inject(FirebaseService)
    private readonly userService = inject(UserService)
    private readonly userStore = inject(UserStore)
    private readonly firebaseAuth = getAuth(this.firebase.getApp())
    private readonly auth = inject(AuthService)

    constructor() {
        const accessToken = localStorage.getItem('access')
        if (accessToken) {
            this.userService
                .getByToken()
                .pipe(takeUntilDestroyed())
                .subscribe({
                    next: (userDto) => {
                        this.userStore.logIn(userDto)
                    },
                    error: () => {
                        this.userStore.logOut()
                    },
                })
        } else {
            this.auth
                .getRedirectResult()
                .pipe(takeUntilDestroyed())
                .subscribe({
                    next: (result) => {
                        this.userStore.logIn(result)
                    },
                    error: (err) => {
                        this.userStore.logOut()
                    },
                })
        }
    }
}
