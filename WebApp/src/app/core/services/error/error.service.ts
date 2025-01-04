import { inject, Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    private readonly matSnackbar = inject(MatSnackBar)

    handleError(error: HttpErrorResponse) {
        console.error(error)
        let name = error.name
        let message = error.error.message
        if (message === 'Firebase: Error (auth/invalid-credential).') {
            name = 'Authentication Error'
            message = 'Invalid credentials'
        }
        if (message === 'Firebase: Error (auth/email-already-in-use).') {
            name = 'Authentication Error'
            message = 'Email already in use'
        }
        this.matSnackbar.open(name + '\n ' + message, 'Ok', {
            duration: 5000,
        })
    }
}
