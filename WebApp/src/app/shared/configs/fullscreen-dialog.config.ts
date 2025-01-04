import { MatDialogConfig } from '@angular/material/dialog'

export const fullscreenDialogConfig: MatDialogConfig = {
    hasBackdrop: false,
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
    panelClass: 'form-fullscreen-dialog',
    autoFocus: false,
    // exitAnimationDuration: '200ms',
    // enterAnimationDuration: '200ms',
    restoreFocus: false,
}
