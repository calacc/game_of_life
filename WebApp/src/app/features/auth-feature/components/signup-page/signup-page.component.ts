import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from '@angular/core'
import { AuthService } from '../../../../core/services/auth/auth.service'
import { ErrorService } from '../../../../core/services/error/error.service'
import { AppStore } from '../../../../core/stores/app.store'
import { Router, RouterLink } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { DividerComponent } from '../../../../shared/components/divider/divider.component'
import { OrDividerComponent } from '../../../../shared/components/or-divider/or-divider.component'
import { AsyncPipe } from '@angular/common'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import {
    MatError,
    MatFormField,
    MatLabel,
    MatSuffix,
} from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { emailValidator } from '../../../../shared/validators/emailValidator'
import { EnvironmentService } from '../../../../core/services/environment/environment.service'
import { fadeInAnimation } from '../../../../app.animations'
import { LogoComponent } from '../../../../shared/components/logo/logo.component'
import { AppData } from '../../../../shared/enums/AppData'

@Component({
    selector: 'app-signup-page',
    standalone: true,
    imports: [
        DividerComponent,
        RouterLink,
        OrDividerComponent,
        AsyncPipe,
        MatButton,
        MatIcon,
        MatError,
        MatIconButton,
        MatSuffix,
        MatLabel,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        LogoComponent,
    ],
    templateUrl: './signup-page.component.html',
    styleUrl: './signup-page.component.scss',
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
    private readonly auth = inject(AuthService)
    private readonly errorService = inject(ErrorService)
    private readonly userStore = inject(AppStore)
    private readonly router = inject(Router)
    private readonly destroyRef = inject(DestroyRef)
    private readonly environmentService = inject(EnvironmentService)
    protected readonly AppData = AppData
    visiblePassword$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    )
    visiblePassword = false
    shake$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    disabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    googleDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    )
    form = new FormGroup({
        email: new FormControl<string>('', {
            validators: [Validators.required, emailValidator],
            nonNullable: true,
        }),
        password: new FormControl<string>('', {
            validators: [Validators.required, Validators.minLength(6)],
            nonNullable: true,
        }),
    })

    togglePasswordVisibility() {
        this.visiblePassword = !this.visiblePassword
        this.visiblePassword$.next(this.visiblePassword)
    }

    submit() {
        if (this.form.valid) {
            const rawForm = this.form.getRawValue()
            this.disabled$.next(true)
            this.auth
                .signupWithEmail(rawForm.email, rawForm.password)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (userDto) => {
                        this.disabled$.next(false)
                        this.userStore.logIn(userDto)
                        this.router.navigateByUrl('/private/main')
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

    signUpWithGoogle() {
        if (this.environmentService.getRedirectAuth()) {
            this.auth.loginWithGoogleRedirect()
        } else {
            this.auth
                .signupWithGoogle()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (userDto) => {
                        this.userStore.logIn(userDto)
                        this.router.navigateByUrl('/private/main')
                    },
                    error: (error) => {
                        this.errorService.handleError(error)
                    },
                })
        }
    }
}
