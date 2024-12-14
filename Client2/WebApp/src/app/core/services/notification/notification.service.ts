import { inject, Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private readonly matSnackbar = inject(MatSnackBar)

    notify(message: string) {
        this.matSnackbar.open(message, 'Ok', { duration: 3000 })
    }
}
