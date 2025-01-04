import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'

@Injectable({
    providedIn: 'root',
})
export class ActiveDrawerItemStore extends ComponentStore<{ name: string }> {
    name$ = this.select((state) => state.name)
    public setFeatureName = this.updater((state, value: string) => {
        return { name: value }
    })

    constructor() {
        super({
            name: '',
        })
    }
}
