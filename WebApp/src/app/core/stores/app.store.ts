import { ComponentStore } from '@ngrx/component-store'
import { Injectable } from '@angular/core'
import { User } from 'firebase/auth'

export interface AppState {
    user: User | null
    loggedIn: boolean
}

@Injectable({
    providedIn: 'root',
})
export class AppStore extends ComponentStore<AppState> {
    loggedIn$ = this.select((state) => state.loggedIn)
    user$ = this.select((state) => state.user)

    logIn(value: User) {
        this.setState({
            user: value,
            loggedIn: true,
        })
    }

    logOut() {
        this.setState({
            user: null,
            loggedIn: false,
        })
    }
}
