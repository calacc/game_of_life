import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from '@angular/core'
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'
import { ElementDetailDto } from '../../../../core/http/dto/element/element-detail.dto'
import { AsyncPipe, JsonPipe } from '@angular/common'
import { BehaviorSubject } from 'rxjs'
import { ElementService } from '../../../../core/http/services/element/element.service'
import { AdvancedFeatureStore } from '../../../../core/stores/advanced-feature.store'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-table-delete-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        JsonPipe,
        AsyncPipe,
    ],
    templateUrl: './table-delete-dialog.component.html',
    styleUrl: './table-delete-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDeleteDialogComponent {
    private readonly elementService = inject(ElementService)
    private readonly basicFeatureStore = inject(AdvancedFeatureStore)
    private readonly destroyRef = inject(DestroyRef)
    private readonly dialogRef = inject(
        MatDialogRef<TableDeleteDialogComponent>
    )
    public readonly data = inject<ElementDetailDto>(MAT_DIALOG_DATA)
    spinner$ = new BehaviorSubject<boolean>(false)

    onNoClick(): void {
        this.dialogRef.close()
    }

    onDelete(elementId: number): void {
        this.spinner$.next(true)
        this.elementService
            .deleteById(elementId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.basicFeatureStore.deleteElementById(elementId)
                    this.spinner$.next(false)
                    this.dialogRef.close()
                },
            })
    }
}
