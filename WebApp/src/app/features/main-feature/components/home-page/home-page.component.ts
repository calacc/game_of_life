import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { PageComponent } from '../../../../shared/components/page/page.component'
import { ActiveDrawerItemStore } from '../../../../core/stores/active-drawer-item.store'
import { LogoComponent } from '../../../../shared/components/logo/logo.component'
import { MatIcon } from '@angular/material/icon'
import { fadeInAnimation } from '../../../../app.animations'

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        AsyncPipe,
        JsonPipe,
        NgIf,
        MatButton,
        PageComponent,
        MatIcon,
        LogoComponent,
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
})
export class HomePageComponent {
    private readonly featureNameStore = inject(ActiveDrawerItemStore)

    constructor() {
        this.featureNameStore.setFeatureName('Home')
    }
}
