import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatDialogRef } from '@angular/material/dialog'
import { Roles } from '../../../../shared/enums/Roles'
import { AsyncPipe, NgIf } from '@angular/common'

import { ActiveDrawerItemStore } from '../../../../core/stores/active-drawer-item.store'
import { Observable } from 'rxjs'
import { AppState, AppStore } from '../../../../core/stores/app.store'
import { Router } from '@angular/router'
import { AuthService } from '../../../../core/services/auth/auth.service'
import { fadeInAnimation } from '../../../../app.animations'
import { CdkTrapFocus } from '@angular/cdk/a11y'
import { LogoComponent } from '../../../../shared/components/logo/logo.component'
import { AppData } from '../../../../shared/enums/AppData'
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component'

@Component({
    selector: 'app-navigation-dialog',
    standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        AsyncPipe,

        MatButton,
        NgIf,
        CdkTrapFocus,
        LogoComponent,
        NavigationButtonsComponent,
    ],
    templateUrl: './navigation-dialog.component.html',
    styleUrl: './navigation-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
})
export class NavigationDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<NavigationDialogComponent>)

    closeDialog() {
        this.dialogRef.close()
    }

    onNavigate() {
        this.dialogRef.close()
    }

    protected readonly AppData = AppData
}
