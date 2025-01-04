import { Pipe, PipeTransform } from '@angular/core'
import { AppState } from '../../../core/stores/app.store'

@Pipe({
    name: 'isAuth',
    standalone: true,
})
export class IsAuthPipe implements PipeTransform {
    transform(value: AppState): boolean {
        return value.loggedIn
    }
}
