import { ChangeDetectionStrategy, Component } from '@angular/core'
import { slideDownError } from '../../../app.animations'

@Component({
    selector: 'app-form-error',
    standalone: true,
    imports: [],
    templateUrl: './form-error.component.html',
    styleUrl: './form-error.component.scss',
    animations: [slideDownError],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {}
