import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Output,
} from '@angular/core'
import { Roles } from '../../../../shared/enums/Roles'
import { MatIcon } from '@angular/material/icon'
import { MatButton } from '@angular/material/button'
import { AuthService } from '../../../../core/services/auth/auth.service'
import { delay, Observable } from 'rxjs'
import { AppState, AppStore } from '../../../../core/stores/app.store'
import { Router } from '@angular/router'
import { ActiveDrawerItemStore } from '../../../../core/stores/active-drawer-item.store'
import { AsyncPipe, NgIf } from '@angular/common'

@Component({
    selector: 'app-navigation-buttons',
    standalone: true,
    imports: [MatIcon, MatButton, AsyncPipe, NgIf],
    templateUrl: './navigation-buttons.component.html',
    styleUrl: './navigation-buttons.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonsComponent {
    private readonly auth = inject(AuthService)
    private readonly userStore = inject(AppStore)
    private readonly router = inject(Router)
    private readonly featureNameStore = inject(ActiveDrawerItemStore)
    protected readonly Roles = Roles

    @Output() onNavigate = new EventEmitter<boolean>()

    state$: Observable<AppState> = this.userStore.state$.pipe(delay(0))
    featureName$ = this.featureNameStore.name$.pipe(delay(0))

    logout() {
        this.auth.logOut()
        this.onNavigate.emit(true)
        this.featureNameStore.setFeatureName('')
        return this.router.navigate(['/auth/login'])
    }

    goTo(path: string, featureName: string) {
        this.featureNameStore.setFeatureName(featureName)
        this.router.navigate([path]).then(() => {
            this.featureNameStore.setFeatureName(featureName)
            this.onNavigate.emit(true)
        })
    }
}
