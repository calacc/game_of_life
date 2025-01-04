import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActiveTabStore } from '../../../../core/stores/active-tab.store'
import { BarChartComponent } from '../../../../shared/templates/charts/bar-chart/bar-chart.component'

@Component({
    selector: 'app-charts-page',
    standalone: true,
    imports: [BarChartComponent],
    templateUrl: './charts-page.component.html',
    styleUrl: './charts-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsPageComponent {
    private readonly activeTabStore = inject(ActiveTabStore)
    constructor() {
        this.activeTabStore.setActiveTab('charts')
    }
}
