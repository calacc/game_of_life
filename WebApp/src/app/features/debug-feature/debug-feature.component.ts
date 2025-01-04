import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { BehaviorSubject } from 'rxjs'
import { PageComponent } from '../../shared/components/page/page.component'
import { AppStore } from '../../core/stores/app.store'
import { TestService } from '../../core/http/services/test/test.service'
import { ActiveDrawerItemStore } from '../../core/stores/active-drawer-item.store'

@Component({
    selector: 'app-debug-feature',
    standalone: true,
    imports: [AsyncPipe, MatButton, NgIf, PageComponent, JsonPipe],
    templateUrl: './debug-feature.component.html',
    styleUrl: './debug-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugFeatureComponent {
    private readonly userStore = inject(AppStore)
    private readonly testService = inject(TestService)
    private readonly featureNameStore = inject(ActiveDrawerItemStore)
    protected readonly localStorage = localStorage
    unprotectedResult$ = new BehaviorSubject<string>('')
    protectedResult$ = new BehaviorSubject<string>('')
    adminProtectedResult$ = new BehaviorSubject<string>('')
    user$ = this.userStore.user$

    constructor() {
        this.featureNameStore.setFeatureName('Debug')
    }

    removeAccessToken() {
        localStorage.removeItem('access')
    }

    removeRefreshToken() {
        localStorage.removeItem('refresh')
    }

    makeProtectedRequest() {
        this.protectedResult$.next('Pending...')
        this.testService.getProtected().subscribe({
            next: () => {
                this.protectedResult$.next('Success')
            },
            error: (err) => {
                this.protectedResult$.next('Error')
                console.log(err)
            },
        })
    }

    makeAdminProtectedRequest() {
        this.adminProtectedResult$.next('Pending...')
        this.testService.getAdminProtected().subscribe({
            next: () => {
                this.adminProtectedResult$.next('Success')
            },
            error: (err) => {
                this.adminProtectedResult$.next('Error')
                console.log(err)
            },
        })
    }

    makeUnprotectedRequest() {
        this.unprotectedResult$.next('Pending...')
        this.testService.getUnprotected().subscribe({
            next: () => {
                this.unprotectedResult$.next('Success')
            },
            error: () => {
                this.unprotectedResult$.next('Error')
            },
        })
    }
}
