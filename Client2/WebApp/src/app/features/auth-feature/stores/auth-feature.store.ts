import { ComponentStore } from '@ngrx/component-store'
import { Injectable } from '@angular/core'

export interface AuthFeatureState {
    email: string
    passwordResetEmailSent: boolean
    redirectResultReceived: boolean
}

const initialState: AuthFeatureState = {
    email: '',
    passwordResetEmailSent: false,
    redirectResultReceived: false,
}

@Injectable({
    providedIn: 'root',
})
export class AuthFeatureStore extends ComponentStore<AuthFeatureState> {
    passwordResetEmailSent$ = this.select(
        (state) => state.passwordResetEmailSent,
    )
    redirectResultReceived$ = this.select(
        (state) => state.redirectResultReceived,
    )
    email$ = this.select((state) => state.email)
    sendPasswordResetEmail = this.updater((state, email: string) => {
        return {
            email: email,
            passwordResetEmailSent: true,
            redirectResultReceived: state.redirectResultReceived,
        }
    })
    redirectResultReceived = this.updater((state) => {
        return {
            email: state.email,
            passwordResetEmailSent: state.passwordResetEmailSent,
            redirectResultReceived: true,
        }
    })

    constructor() {
        super(initialState)
    }
}
