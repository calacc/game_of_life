import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AsyncPipe, NgIf } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { UserStore } from '../../core/stores/user.store'
import { TestService } from '../../core/http/services/test/test.service'
import { BehaviorSubject } from 'rxjs'

@Component({
    selector: 'app-debug-feature',
    standalone: true,
    imports: [AsyncPipe, MatButton, NgIf],
    templateUrl: './debug-feature.component.html',
    styleUrl: './debug-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugFeatureComponent {
    private readonly userStore = inject(UserStore)
    private readonly testService = inject(TestService)
    unprotectedResult$ = new BehaviorSubject<string>('')
    protectedResult$ = new BehaviorSubject<string>('')
    user$ = this.userStore.user$

    removeAccessToken() {
        localStorage.removeItem('access')
    }
    removeRefreshToken() {
        localStorage.removeItem('refresh')
    }

    makeProtectedRequest() {
        this.protectedResult$.next('Pending...')
        this.testService.getProtected().subscribe({
            next: (result) => {
                this.protectedResult$.next('Success')
            },
            error: (err) => {
                this.protectedResult$.next('Error')
                console.log(err)
            },
        })
    }

    makeUnprotectedRequest() {
        this.unprotectedResult$.next('Pending...')
        this.testService.getUnprotected().subscribe({
            next: (result) => {
                this.unprotectedResult$.next('Success')
            },
            error: (err) => {
                this.unprotectedResult$.next('Error')
            },
        })
    }

    protected readonly localStorage = localStorage
}
