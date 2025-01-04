import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatButton, MatIconButton } from '@angular/material/button'
import { AsyncPipe } from '@angular/common'
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog'

@Component({
    selector: 'app-fullscreen-dialog',
    standalone: true,
    imports: [MatIcon, MatIconButton, AsyncPipe, MatButton, MatDialogContent],
    templateUrl: './fullscreen-dialog.component.html',
    styleUrl: './fullscreen-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<FullscreenDialogComponent>)

    closeDialog() {
        this.dialogRef.close()
    }
}
