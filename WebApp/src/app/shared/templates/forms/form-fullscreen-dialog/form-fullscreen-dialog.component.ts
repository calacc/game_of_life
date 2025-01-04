import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core'
import { MatButton, MatIconButton } from '@angular/material/button'
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { MatIcon } from '@angular/material/icon'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { MatCheckbox } from '@angular/material/checkbox'
import {
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
} from '@angular/material/datepicker'
import {
    MatError,
    MatFormField,
    MatHint,
    MatLabel,
    MatSuffix,
} from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatOption, provideNativeDateAdapter } from '@angular/material/core'
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio'
import { MatSelect, MatSelectTrigger } from '@angular/material/select'
import { NotificationService } from '../../../../core/services/notification/notification.service'
import { BehaviorSubject, map, Observable, of, startWith } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { ModalFormAutoFocusDirective } from '../../../directives/modal-form-auto-focus/modal-form-auto-focus.directive'
import { fadeInAnimation } from '../../../../app.animations'
import { FormErrorComponent } from '../../../components/form-error/form-error.component'
import { FormErrorPlaceholderComponent } from '../../../components/form-error-placeholder/form-error-placeholder.component'
import {
    MatAutocomplete,
    MatAutocompleteTrigger,
} from '@angular/material/autocomplete'
import { MatListOption, MatSelectionList } from '@angular/material/list'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { MatSlider, MatSliderRangeThumb } from '@angular/material/slider'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AddSelectDialogComponent } from '../add-select-dialog/add-select-dialog.component'
import { CdkScrollable } from '@angular/cdk/scrolling'

@Component({
    selector: 'app-form-fullscreen-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatIconButton,
        MatIcon,
        CdkTextareaAutosize,
        MatCheckbox,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatFormField,
        MatHint,
        MatInput,
        MatLabel,
        MatOption,
        MatRadioButton,
        MatRadioGroup,
        MatSelect,
        MatSuffix,
        MatDatepicker,
        AsyncPipe,
        MatError,
        ReactiveFormsModule,
        ModalFormAutoFocusDirective,
        FormErrorComponent,
        FormErrorPlaceholderComponent,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatListOption,
        MatSelectTrigger,
        MatSelectionList,
        MatSlideToggle,
        MatSlider,
        MatSliderRangeThumb,
        CdkScrollable,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './form-fullscreen-dialog.component.html',
    styleUrl: './form-fullscreen-dialog.component.scss',
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFullscreenDialogComponent implements OnInit {
    private readonly dialogRef = inject(
        MatDialogRef<FormFullscreenDialogComponent>
    )
    private readonly dialog = inject(MatDialog)
    private readonly notificationService = inject(NotificationService)
    selectOptions$ = new BehaviorSubject<string[]>([])
    selectOptions: string[] = []
    loading$ = new BehaviorSubject<boolean>(false)
    shake$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    autocompleteOptions: string[] = [
        'Apple',
        'Banana',
        'Cherry',
        'Dragonfruit',
        'Elderberry',
        'Fig',
        'Grape',
        'Honeydew',
        'Indian Fig',
        'Jackfruit',
    ]
    filteredOptions!: Observable<string[]>
    form = new FormGroup({
        input1: new FormControl('', Validators.required),
        input2: new FormControl('', Validators.required),
        autocomplete: new FormControl(''),
        select: new FormControl('', Validators.required),
        multipleSelect: new FormControl(''),
        date: new FormControl('', Validators.required),
        radio: new FormControl('1', Validators.required),
        checkboxes: new FormGroup({
            checkbox1: new FormControl(false),
            checkbox2: new FormControl(false),
            checkbox3: new FormControl(false),
        }),
        checkboxList: new FormControl(),
        radioList: new FormControl(),
        slideToggles: new FormGroup({
            toggle1: new FormControl(false),
            toggle2: new FormControl(false),
        }),
        textarea: new FormControl('', Validators.required),
        range: new FormGroup({
            range1: new FormControl(200),
            range2: new FormControl(400),
        }),
        requiredCheckbox: new FormControl(false, Validators.requiredTrue),
    })

    constructor() {
        of([
            'Option1',
            'Option2',
            'Option3',
            'Option4',
            'Option5',
            'Option6',
            'Option7',
            'Option8',
            'Option9',
            'Option10',
        ])
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (value) => {
                    this.selectOptions = [...value]
                    this.selectOptions$.next(value)
                },
            })
    }

    ngOnInit() {
        this.filteredOptions =
            this.form.controls.autocomplete.valueChanges.pipe(
                startWith(''),
                map((value) => this._filter(value || ''))
            )
    }

    submit() {
        if (this.form.valid) {
            this.loading$.next(true)
            setTimeout(() => {
                this.loading$.next(false)
                if (this.form.getRawValue().radio === '2') {
                    this.notificationService.notify(
                        'Error when submitting form!'
                    )
                    this.shake$.next(true)
                    setTimeout(() => {
                        this.shake$.next(false)
                    }, 500)
                } else {
                    this.notificationService.notify(
                        'Form Submitted Successfully'
                    )
                    this.dialogRef.close()
                    console.log(this.form.getRawValue())
                }
            }, 1000)
        } else {
            this.form.markAllAsTouched()
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddSelectDialogComponent, {
            autoFocus: false,
        })
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    if (result.data) {
                        this.selectOptions.push(result.data.optionName)
                        this.selectOptions$.next(this.selectOptions)
                        this.form.controls.select.setValue(
                            result.data.optionName
                        )
                    }
                }
            },
        })
    }

    closeDialog() {
        this.dialogRef.close()
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase()
        return this.autocompleteOptions.filter((option) =>
            option.toLowerCase().includes(filterValue)
        )
    }
}
