import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormPageComponent } from '../../../../shared/templates/forms/form-page/form-page.component'
import { MatButton } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { FormFullscreenDialogComponent } from '../../../../shared/templates/forms/form-fullscreen-dialog/form-fullscreen-dialog.component'
import { fullscreenDialogConfig } from '../../../../shared/configs/fullscreen-dialog.config'
import { fadeInAnimation } from '../../../../app.animations'

@Component({
    selector: 'app-basic-form-page',
    standalone: true,
    imports: [FormPageComponent, MatButton],
    templateUrl: './basic-form-page.component.html',
    styleUrl: './basic-form-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
})
export class BasicFormPageComponent {
    private readonly dialog = inject(MatDialog)

    openDialogForm() {
        this.dialog.open(FormFullscreenDialogComponent, fullscreenDialogConfig)
    }
}
