import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AuthFeatureStore } from '../../../../core/stores/auth-feature.store'
import { AsyncPipe } from '@angular/common'
import { fadeInAnimation } from '../../../../app.animations'

@Component({
    selector: 'app-reset-password-success-page',
    standalone: true,
    imports: [RouterLink, AsyncPipe],
    templateUrl: './reset-password-success-page.component.html',
    styleUrl: './reset-password-success-page.component.scss',
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordSuccessPageComponent {
    private readonly authFeatureStore = inject(AuthFeatureStore)
    email$ = this.authFeatureStore.email$
}
