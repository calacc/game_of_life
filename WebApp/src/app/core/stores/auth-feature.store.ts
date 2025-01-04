import { ComponentStore } from '@ngrx/component-store'
import { Injectable } from '@angular/core'

export interface AuthFeatureState {
    email: string
    passwordResetEmailSent: boolean
}

const initialState: AuthFeatureState = {
    email: '',
    passwordResetEmailSent: false,
}

@Injectable({
    providedIn: 'root',
})
export class AuthFeatureStore extends ComponentStore<AuthFeatureState> {
    passwordResetEmailSent$ = this.select(
        (state) => state.passwordResetEmailSent
    )
    email$ = this.select((state) => state.email)
    sendPasswordResetEmail = this.updater((state, email: string) => {
        return {
            email: email,
            passwordResetEmailSent: true,
        }
    })

    constructor() {
        super(initialState)
    }
}
