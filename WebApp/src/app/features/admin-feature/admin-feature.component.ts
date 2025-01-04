import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { PageComponent } from '../../shared/components/page/page.component'
import { ActiveDrawerItemStore } from '../../core/stores/active-drawer-item.store'

@Component({
    selector: 'app-admin-feature',
    standalone: true,
    imports: [PageComponent],
    templateUrl: './admin-feature.component.html',
    styleUrl: './admin-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFeatureComponent {
    private readonly featureNameStore = inject(ActiveDrawerItemStore)

    constructor() {
        this.featureNameStore.setFeatureName('Admin')
    }
}
