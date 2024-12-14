import { UserDto } from '../http/dto/user/user.dto'
import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'

export interface ProgressBarState {
    loading: boolean
}

@Injectable({
    providedIn: 'root',
})
export class ProgressBarStore extends ComponentStore<ProgressBarState> {
    loading$ = this.select((state) => state.loading)
    public startLoading = this.updater((state) => {
        return { loading: true }
    })
    public stopLoading = this.updater((state) => {
        return { loading: false }
    })

    constructor() {
        super({ loading: false })
    }
}
