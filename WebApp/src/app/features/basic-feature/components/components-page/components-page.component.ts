import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { BehaviorSubject } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { FileUploadComponent } from '../../../../shared/components/file-upload/file-upload.component'
import { fadeInAnimation } from '../../../../app.animations'
import { ActiveTabStore } from '../../../../core/stores/active-tab.store'
import { DialogComponent } from '../../../../shared/templates/dialogs/dialog/dialog.component'
import { fullscreenDialogConfig } from '../../../../shared/configs/fullscreen-dialog.config'
import { FullscreenDialogComponent } from '../../../../shared/templates/dialogs/fullscreen-dialog/fullscreen-dialog.component'
import { SingleImageUploadComponent } from '../../../../shared/components/single-image-upload/single-image-upload.component'
import {
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    Overlay,
    ScrollStrategy,
} from '@angular/cdk/overlay'
import { CloseOnScrollOverlayComponent } from '../../../../shared/templates/overlays/close-on-scroll-overlay/close-on-scroll-overlay.component'
import { RepositionOverlayComponent } from '../../../../shared/templates/overlays/reposition-overlay/reposition-overlay.component'

@Component({
    selector: 'app-components-page',
    standalone: true,
    imports: [
        MatButton,
        AsyncPipe,
        FileUploadComponent,
        SingleImageUploadComponent,
        CdkConnectedOverlay,
        CdkOverlayOrigin,
        CloseOnScrollOverlayComponent,
        RepositionOverlayComponent,
    ],
    templateUrl: './components-page.component.html',
    styleUrl: './components-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
})
export class ComponentsPageComponent {
    private readonly dialog = inject(MatDialog)
    private readonly activeTabStore = inject(ActiveTabStore)
    private readonly overlay = inject(Overlay)
    loadingButton$ = new BehaviorSubject<boolean>(false)
    isOpen = false
    isOpen2 = false
    isOpen3 = false
    closeScrollStrategy: ScrollStrategy

    constructor() {
        this.activeTabStore.setActiveTab('components')
        this.closeScrollStrategy = this.overlay.scrollStrategies.close()
    }

    onOverlayClose() {
        this.isOpen2 = false
    }

    startLoading() {
        this.loadingButton$.next(true)
        setTimeout(() => {
            this.loadingButton$.next(false)
        }, 2000)
    }

    logFileUpload(files: File[]) {
        console.log(files)
    }

    logImageUpload(file: File | null) {
        console.log(file)
    }

    openDialog() {
        this.dialog.open(DialogComponent, {})
    }

    openFullscreenDialog() {
        this.dialog.open(FullscreenDialogComponent, fullscreenDialogConfig)
    }
}
