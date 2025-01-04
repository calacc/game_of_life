import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from '@angular/core'
import { ErrorService } from '../../../../core/services/error/error.service'
import { Router, RouterLink } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { emailValidator } from '../../../../shared/validators/emailValidator'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { AsyncPipe } from '@angular/common'
import { AuthFeatureStore } from '../../../../core/stores/auth-feature.store'
import { fadeInAnimation } from '../../../../app.animations'
import { AuthService } from '../../../../core/services/auth/auth.service'

@Component({
    selector: 'app-reset-password-page',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatButton,
        AsyncPipe,
        MatLabel,
        MatError,
        RouterLink,
    ],
    templateUrl: './reset-password-page.component.html',
    styleUrl: './reset-password-page.component.scss',
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPageComponent {
    private readonly authService = inject(AuthService)
    private readonly authFeatureStore = inject(AuthFeatureStore)
    private readonly errorService = inject(ErrorService)
    private readonly router = inject(Router)
    private readonly destroyRef = inject(DestroyRef)
    shake$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    disabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    form = new FormGroup({
        email: new FormControl<string>('', {
            validators: [Validators.required, emailValidator],
            nonNullable: true,
        }),
    })

    submit() {
        if (this.form.valid) {
            const rawForm = this.form.getRawValue()
            this.disabled$.next(true)
            this.authService
                .sendPasswordResetEmail(rawForm.email)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: () => {
                        this.authFeatureStore.sendPasswordResetEmail(
                            rawForm.email
                        )
                        this.router.navigate(['auth', 'reset-password-success'])
                    },
                    error: (error) => {
                        this.shake$.next(true)
                        this.disabled$.next(false)
                        setTimeout(() => {
                            this.shake$.next(false)
                        }, 500)
                        this.errorService.handleError(error)
                    },
                })
        }
    }
}
