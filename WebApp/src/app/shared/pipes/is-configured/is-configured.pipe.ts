import { Pipe, PipeTransform } from '@angular/core'
import { AppState } from '../../../core/stores/app.store'

@Pipe({
    name: 'isConfigured',
    standalone: true,
})
export class IsConfiguredPipe implements PipeTransform {
    transform(value: AppState): boolean {
        return value.user.configured
    }
}
