import { ChangeDetectionStrategy, Component } from '@angular/core'
import { fadeInAnimation } from '../../../app.animations'

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss',
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {}
