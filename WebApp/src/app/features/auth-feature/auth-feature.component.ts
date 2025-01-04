import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AsyncPipe, NgIf } from '@angular/common'
import { LoadingPageComponent } from '../../shared/components/loading-page/loading-page.component'
import { fadeInAnimation } from '../../app.animations'

@Component({
    selector: 'app-auth-feature',
    standalone: true,
    imports: [RouterOutlet, NgIf, AsyncPipe, LoadingPageComponent],
    templateUrl: './auth-feature.component.html',
    styleUrl: './auth-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
})
export class AuthFeatureComponent {}
