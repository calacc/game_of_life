import { Pipe, PipeTransform } from '@angular/core'
import { AppState } from '../../../core/stores/app.store'

@Pipe({
    name: 'isNotAuth',
    standalone: true,
})
export class IsNotAuthPipe implements PipeTransform {
    transform(value: AppState): boolean {
        return !value.loggedIn
    }
}
