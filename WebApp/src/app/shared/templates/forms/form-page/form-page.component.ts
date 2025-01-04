import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core'
import { PageComponent } from '../../../components/page/page.component'
import {
    MatFormField,
    MatFormFieldModule,
    MatHint,
    MatLabel,
} from '@angular/material/form-field'
import { MatInput, MatInputModule } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import {
    MatOption,
    MatSelect,
    MatSelectTrigger,
} from '@angular/material/select'
import {
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatDatepickerToggle,
} from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio'
import { ActiveTabStore } from '../../../../core/stores/active-tab.store'
import { NotificationService } from '../../../../core/services/notification/notification.service'
import { BehaviorSubject, map, Observable, of, startWith } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { FormAutoFocusDirective } from '../../../directives/form-auto-focus/form-auto-focus.directive'
import { fadeInAnimation } from '../../../../app.animations'
import { MatChipListbox, MatChipOption } from '@angular/material/chips'
import { MatListOption, MatSelectionList } from '@angular/material/list'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import {
    MatAutocomplete,
    MatAutocompleteTrigger,
} from '@angular/material/autocomplete'
import { MatIcon } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { AddSelectDialogComponent } from '../add-select-dialog/add-select-dialog.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormErrorComponent } from '../../../components/form-error/form-error.component'
import { FormErrorPlaceholderComponent } from '../../../components/form-error-placeholder/form-error-placeholder.component'
import { MatSlider, MatSliderRangeThumb } from '@angular/material/slider'

@Component({
    selector: 'app-form-page',
    standalone: true,
    imports: [
        PageComponent,
        MatFormField,
        MatInput,
        MatLabel,
        MatButton,
        MatSelect,
        MatOption,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        MatHint,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatCheckbox,
        MatRadioGroup,
        MatRadioButton,
        AsyncPipe,
        ReactiveFormsModule,
        FormAutoFocusDirective,
        MatChipOption,
        MatChipListbox,
        MatListOption,
        MatSelectionList,
        MatSlideToggle,
        MatSelectTrigger,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatIcon,
        FormErrorComponent,
        FormErrorPlaceholderComponent,
        MatSlider,
        MatSliderRangeThumb,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './form-page.component.html',
    styleUrl: './form-page.component.scss',
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPageComponent implements OnInit {
    private readonly activeTabStore = inject(ActiveTabStore)
    private readonly notificationService = inject(NotificationService)
    private readonly dialog = inject(MatDialog)
    loading$ = new BehaviorSubject<boolean>(false)
    shake$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    selectOptions$ = new BehaviorSubject<string[]>([])
    selectOptions: string[] = []
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
        this.activeTabStore.setActiveTab('form')
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
                    console.log(this.form.getRawValue())
                }
            }, 1000)
        } else {
            this.form.markAllAsTouched()
            return
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

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase()
        return this.autocompleteOptions.filter((option) =>
            option.toLowerCase().includes(filterValue)
        )
    }
}
