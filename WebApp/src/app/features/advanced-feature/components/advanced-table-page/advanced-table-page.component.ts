import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { fadeInAnimation } from '../../../../app.animations'
import { ActiveTabStore } from '../../../../core/stores/active-tab.store'
import { TablePageComponent } from '../../../../shared/templates/table/table-page/table-page.component'

@Component({
    selector: 'app-advanced-table-page',
    standalone: true,
    imports: [TablePageComponent],
    templateUrl: './advanced-table-page.component.html',
    styleUrl: './advanced-table-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
})
export class AdvancedTablePageComponent {
    private readonly activeTabStore = inject(ActiveTabStore)

    constructor() {
        this.activeTabStore.setActiveTab('table')
    }
}
