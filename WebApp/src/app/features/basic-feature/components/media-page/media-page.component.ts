import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { fadeInAnimation } from '../../../../app.animations'
import { ActiveTabStore } from '../../../../core/stores/active-tab.store'

@Component({
    selector: 'app-media-page',
    standalone: true,
    imports: [],
    templateUrl: './media-page.component.html',
    styleUrl: './media-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
})
export class MediaPageComponent {
    private readonly activeTabStore = inject(ActiveTabStore)

    constructor() {
        this.activeTabStore.setActiveTab('media')
    }
}
