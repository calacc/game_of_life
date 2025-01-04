import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActiveDrawerItemStore } from '../../core/stores/active-drawer-item.store'
import { fadeInAnimation } from '../../app.animations'

@Component({
    selector: 'app-settings-feature',
    standalone: true,
    imports: [],
    templateUrl: './settings-feature.component.html',
    styleUrl: './settings-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
})
export class SettingsFeatureComponent {
    private readonly activeDrawerItem = inject(ActiveDrawerItemStore)

    constructor() {
        this.activeDrawerItem.setFeatureName('Settings')
    }
}
