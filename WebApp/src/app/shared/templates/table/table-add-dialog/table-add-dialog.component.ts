import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from '@angular/core'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { MatButton, MatIconButton } from '@angular/material/button'
import {
    MAT_DIALOG_DATA,
    MatDialogContent,
    MatDialogRef,
} from '@angular/material/dialog'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'
import { ModalFormAutoFocusDirective } from '../../../directives/modal-form-auto-focus/modal-form-auto-focus.directive'
import { ElementService } from '../../../../core/http/services/element/element.service'
import { AdvancedFeatureStore } from '../../../../core/stores/advanced-feature.store'
import { NotificationService } from '../../../../core/services/notification/notification.service'
import { ErrorService } from '../../../../core/services/error/error.service'
import { ElementCategoryDto } from '../../../../core/http/dto/element/element-category.dto'
import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { CreateElementDto } from '../../../../core/http/dto/element/create-element.dto'

@Component({
    selector: 'app-table-add-dialog',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        MatButton,
        MatDialogContent,
        MatError,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        ModalFormAutoFocusDirective,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
    ],
    templateUrl: './table-add-dialog.component.html',
    styleUrl: './table-add-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableAddDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<TableAddDialogComponent>)
    private readonly elementService = inject(ElementService)
    private readonly basicFeatureStore = inject(AdvancedFeatureStore)
    private readonly notificationService = inject(NotificationService)
    private readonly errorService = inject(ErrorService)
    private readonly destroyRef = inject(DestroyRef)
    public readonly data = inject<{
        categories: ElementCategoryDto[]
    }>(MAT_DIALOG_DATA)
    loading$ = new BehaviorSubject<boolean>(false)
    shake$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    selectOptions: ElementCategoryDto[] = this.data.categories
    form = new FormGroup({
        name: new FormControl<string>('', [Validators.required]),
        weight: new FormControl<number>(0),
        symbol: new FormControl<string>('', [Validators.required]),
        density: new FormControl<number>(0),
        meltingPoint: new FormControl<number>(0),
        boilingPoint: new FormControl<number>(0),
        atomicRadius: new FormControl<number>(0),
        categoryId: new FormControl<number | null>(null, [Validators.required]),
    })

    isCreateElementDto = (
        value: typeof this.form.value
    ): value is CreateElementDto => {
        return value.categoryId != null
    }

    submit() {
        if (this.form.valid && this.isCreateElementDto(this.form.value)) {
            this.loading$.next(true)
            const createElementDto: CreateElementDto = this.form.value
            this.elementService
                .create(createElementDto)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (data) => {
                        this.basicFeatureStore.addElement(data)
                        this.notificationService.notify(
                            'Element added successfully.'
                        )
                        this.loading$.next(false)
                        this.dialogRef.close()
                    },
                    error: (e) => {
                        this.errorService.handleError(e)
                        this.loading$.next(false)
                    },
                })
        } else {
            this.form.markAllAsTouched()
            return
        }
    }

    closeDialog() {
        this.dialogRef.close()
    }
}
