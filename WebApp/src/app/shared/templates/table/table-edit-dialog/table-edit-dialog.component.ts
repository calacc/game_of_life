import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from '@angular/core'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { FormErrorComponent } from '../../../components/form-error/form-error.component'
import { FormErrorPlaceholderComponent } from '../../../components/form-error-placeholder/form-error-placeholder.component'
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import {
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption,
} from '@angular/material/autocomplete'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatCheckbox } from '@angular/material/checkbox'
import {
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
} from '@angular/material/datepicker'
import {
    MAT_DIALOG_DATA,
    MatDialogContent,
    MatDialogRef,
} from '@angular/material/dialog'
import {
    MatError,
    MatFormField,
    MatHint,
    MatLabel,
    MatSuffix,
} from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatListOption, MatSelectionList } from '@angular/material/list'
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio'
import { MatSelect, MatSelectTrigger } from '@angular/material/select'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { MatSlider, MatSliderRangeThumb } from '@angular/material/slider'
import { ModalFormAutoFocusDirective } from '../../../directives/modal-form-auto-focus/modal-form-auto-focus.directive'
import { NotificationService } from '../../../../core/services/notification/notification.service'
import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ElementDetailDto } from '../../../../core/http/dto/element/element-detail.dto'
import { ElementCategoryDto } from '../../../../core/http/dto/element/element-category.dto'
import { ElementService } from '../../../../core/http/services/element/element.service'
import { AdvancedFeatureStore } from '../../../../core/stores/advanced-feature.store'
import { EditElementDto } from '../../../../core/http/dto/element/edit-element.dto'
import { ErrorService } from '../../../../core/services/error/error.service'

@Component({
    selector: 'app-table-edit-dialog',
    standalone: true,
    imports: [
        AsyncPipe,
        CdkTextareaAutosize,
        FormErrorComponent,
        FormErrorPlaceholderComponent,
        FormsModule,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatButton,
        MatCheckbox,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDialogContent,
        MatError,
        MatFormField,
        MatHint,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatListOption,
        MatOption,
        MatRadioButton,
        MatRadioGroup,
        MatSelect,
        MatSelectTrigger,
        MatSelectionList,
        MatSlideToggle,
        MatSlider,
        MatSliderRangeThumb,
        MatSuffix,
        ModalFormAutoFocusDirective,
        ReactiveFormsModule,
        NgForOf,
        NgIf,
    ],
    templateUrl: './table-edit-dialog.component.html',
    styleUrl: './table-edit-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableEditDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<TableEditDialogComponent>)
    private readonly elementService = inject(ElementService)
    private readonly basicFeatureStore = inject(AdvancedFeatureStore)
    private readonly notificationService = inject(NotificationService)
    private readonly errorService = inject(ErrorService)
    private readonly destroyRef = inject(DestroyRef)
    public readonly data = inject<{
        element: ElementDetailDto
        categories: ElementCategoryDto[]
    }>(MAT_DIALOG_DATA)
    loading$ = new BehaviorSubject<boolean>(false)
    shake$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
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
    selectOptions: ElementCategoryDto[] = this.data.categories

    constructor() {
        this.form.patchValue(this.data.element)
        this.form.controls.categoryId.setValue(this.data.element.categoryId)
    }

    isEditElementDto = (
        value: typeof this.form.value
    ): value is EditElementDto => {
        return value.categoryId != null
    }

    submit() {
        if (this.form.valid && this.isEditElementDto(this.form.value)) {
            this.loading$.next(true)
            const editElementDto: EditElementDto = this.form.value
            this.elementService
                .editById(this.data.element.id, editElementDto)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (e) => {
                        this.basicFeatureStore.editElementById({
                            elementId: this.data.element.id,
                            editedElement: e,
                        })
                        this.notificationService.notify(
                            'Element edited successfully.'
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
