import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ActiveDrawerItemStore } from '../../core/stores/active-drawer-item.store'

@Component({
    selector: 'app-main-feature',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './main-feature.component.html',
    styleUrl: './main-feature.component.scss',
    providers: [ActiveDrawerItemStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFeatureComponent {}
