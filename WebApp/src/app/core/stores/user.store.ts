import { ComponentStore } from '@ngrx/component-store'
import { UserDto } from '../http/dto/user/user.dto'
import { Injectable } from '@angular/core'

export interface UserState {
    user: UserDto
    loggedIn: boolean | null
}

const initialUserData: UserDto = {
    email: '',
    id: '',
    provider: '',
    createdAt: new Date(),
}

@Injectable({
    providedIn: 'root',
})
export class UserStore extends ComponentStore<UserState> {
    loggedIn$ = this.select((state) => state.loggedIn)
    user$ = this.select((state) => state.user)
    public logIn = this.updater((state, value: UserDto) => {
        return {
            user: value,
            loggedIn: true,
        }
    })
    public logOut = this.updater((state) => {
        return {
            user: initialUserData,
            loggedIn: false,
        }
    })

    constructor() {
        super({
            user: initialUserData,
            loggedIn: null,
        })
    }
}
