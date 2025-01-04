import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'

// To Be Injected in the Pages that have tab based navigation
@Injectable()
export class ActiveTabStore extends ComponentStore<{ name: string }> {
    name$ = this.select((state) => state.name)
    public setActiveTab = this.updater((state, value: string) => {
        return { name: value }
    })

    constructor() {
        super({
            name: '',
        })
    }
}
