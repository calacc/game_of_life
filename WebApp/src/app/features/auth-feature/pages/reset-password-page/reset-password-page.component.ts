import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core'
import { ErrorService } from '../../../../core/services/error/error.service'
import { Router, RouterLink } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { emailValidator } from '../../../../shared/validators/emailValidator'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FirebaseAuthService } from '../../../../core/services/auth/firebase-auth/firebase-auth.service'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { AsyncPipe } from '@angular/common'
import { AuthFeatureStore } from '../../stores/auth-feature.store'

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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPageComponent {
    shake$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    disabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    form = new FormGroup({
        email: new FormControl<string>('', {
            validators: [Validators.required, emailValidator],
            nonNullable: true,
        }),
    })
    private readonly firebaseAuth = inject(FirebaseAuthService)
    private readonly authFeatureStore = inject(AuthFeatureStore)
    private readonly errorService = inject(ErrorService)
    private readonly router = inject(Router)
    private readonly destroyRef = inject(DestroyRef)

    submit() {
        if (this.form.valid) {
            const rawForm = this.form.getRawValue()
            this.disabled$.next(true)
            this.firebaseAuth
                .sendPasswordResetEmail(rawForm.email)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (result) => {
                        this.authFeatureStore.sendPasswordResetEmail(
                            rawForm.email,
                        )
                        this.router.navigate([
                            'private',
                            'auth',
                            'reset-password-success',
                        ])
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
