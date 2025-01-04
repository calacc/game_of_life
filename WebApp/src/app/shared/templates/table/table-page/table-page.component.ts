import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    OnInit,
    ViewChild,
} from '@angular/core'
import { ActiveTabStore } from '../../../../core/stores/active-tab.store'
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableDataSource,
} from '@angular/material/table'
import {
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
} from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import {
    MatOption,
    MatSelect,
    MatSelectChange,
    MatSelectTrigger,
} from '@angular/material/select'
import {
    MatButton,
    MatFabButton,
    MatIconButton,
} from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import {
    BehaviorSubject,
    map,
    Observable,
    startWith,
    switchMap,
    tap,
} from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatSort, MatSortHeader } from '@angular/material/sort'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { fadeInAnimation } from '../../../../app.animations'
import { ElementDetailDto } from '../../../../core/http/dto/element/element-detail.dto'
import { AdvancedFeatureStore } from '../../../../core/stores/advanced-feature.store'
import { ElementCategoryDto } from '../../../../core/http/dto/element/element-category.dto'
import { AppStore } from '../../../../core/stores/app.store'
import { ElementService } from '../../../../core/http/services/element/element.service'
import { AsyncPipe } from '@angular/common'
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
} from '@angular/material/autocomplete'
import { IsVisibleButtonComponent } from '../is-visible-button/is-visible-button.component'
import { MatDialog } from '@angular/material/dialog'
import { TableDeleteDialogComponent } from '../table-delete-dialog/table-delete-dialog.component'
import { TableEditDialogComponent } from '../table-edit-dialog/table-edit-dialog.component'
import { fullscreenDialogConfig } from '../../../configs/fullscreen-dialog.config'
import { TableAddDialogComponent } from '../table-add-dialog/table-add-dialog.component'

export interface ElementTable {
    id: number
    position: number
    name: string
    weight: number
    symbol: string
    density: number
    meltingPoint: number
    atomicRadius: number
    boilingPoint: number
    isVisible: boolean
    categoryName: string
    element: ElementDetailDto
    userId: number
}

@Component({
    selector: 'app-table-page',
    standalone: true,
    imports: [
        MatLabel,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderCellDef,
        MatCell,
        MatCellDef,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRow,
        MatRowDef,
        MatFormField,
        MatInput,
        MatSelect,
        MatOption,
        MatButton,
        MatIcon,
        MatFabButton,
        MatPaginator,
        MatSuffix,
        MatSort,
        MatSortHeader,
        MatIconButton,
        ReactiveFormsModule,
        AsyncPipe,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatSelectTrigger,
        IsVisibleButtonComponent,
        MatPrefix,
    ],
    templateUrl: './table-page.component.html',
    animations: [fadeInAnimation],
    styleUrl: './table-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePageComponent implements AfterViewInit, OnInit {
    private readonly activeTabStore = inject(ActiveTabStore)
    private readonly basicFeatureStore = inject(AdvancedFeatureStore)
    private readonly appStore = inject(AppStore)
    private readonly elementService = inject(ElementService)
    private readonly pg = inject(MatPaginatorIntl)
    private readonly destroyRef = inject(DestroyRef)
    private readonly dialog = inject(MatDialog)
    @ViewChild(MatSort) sort!: MatSort
    @ViewChild(MatPaginator) paginator!: MatPaginator
    displayedColumns: string[] = [
        'position',
        'name',
        'weight',
        'symbol',
        'density',
        'meltingPoint',
        'boilingPoint',
        'atomicRadius',
        'categoryName',
        'actions',
    ]
    tableWidth = 'auto'
    dataSource: MatTableDataSource<ElementTable> =
        new MatTableDataSource<ElementTable>([])
    elements: ElementTable[] = []
    categories: ElementCategoryDto[] = []
    filterValue = ''
    filter = new FormControl()
    resetDataSpinner$ = new BehaviorSubject<boolean>(false)
    autocompleteOptions: string[] = []
    filteredOptions!: Observable<string[]>
    search = new FormControl()

    constructor() {
        // Set current active tab
        this.activeTabStore.setActiveTab('table')

        // Observe element data
        this.basicFeatureStore.elementData$
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (data) => {
                    this.categories = data.categories
                    this.dataSource = new MatTableDataSource(
                        data.elements.map((e) => ({
                            id: e.id,
                            position: e.position,
                            name: e.name,
                            weight: e.weight,
                            symbol: e.symbol,
                            density: e.density,
                            meltingPoint: e.meltingPoint,
                            atomicRadius: e.atomicRadius,
                            isVisible: e.isVisible,
                            userId: e.userId,
                            boilingPoint: e.boilingPoint,
                            categoryName: e.category.name,
                            element: e,
                        }))
                    )
                    this.elements = data.elements.map((e) => ({
                        id: e.id,
                        position: e.position,
                        name: e.name,
                        weight: e.weight,
                        symbol: e.symbol,
                        density: e.density,
                        meltingPoint: e.meltingPoint,
                        atomicRadius: e.atomicRadius,
                        isVisible: e.isVisible,
                        categoryName: e.category.name,
                        userId: e.userId,
                        boilingPoint: e.boilingPoint,
                        element: e,
                    }))
                    this.autocompleteOptions = data.elements.map((e) => e.name)
                    // Each time data is updated we also need to update Paginator and Sorter
                    this.dataSource.sort = this.sort
                    this.dataSource.paginator = this.paginator
                },
            })

        // Paginator i18n
        this.pg.itemsPerPageLabel = 'Size'
        this.pg.firstPageLabel = 'First Page'
        this.pg.nextPageLabel = 'Next Page'
        this.pg.previousPageLabel = 'Previous Page'
        this.pg.getRangeLabel = (
            page: number,
            pageSize: number,
            length: number
        ) => {
            length = Math.max(length, 0)
            const startIndex = page * pageSize
            const endIndex =
                startIndex < length
                    ? Math.min(startIndex + pageSize, length)
                    : startIndex + pageSize
            return `${startIndex + 1} - ${endIndex} of ${length}`
        }
    }

    // Set Paginator and Sorter for the first time (they don't exist when constructor is called)
    ngAfterViewInit() {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        const table = document.querySelector('#table')
        if (table) {
            this.tableWidth = table.scrollWidth + 'px'
        }
    }

    ngOnInit() {
        this.filteredOptions = this.search.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
        )
    }

    applySearch(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
        this.filterValue = filterValue
        this.dataSource.filter = filterValue.trim().toLowerCase()
        this.paginator.length = this.dataSource.filteredData.length
    }

    clearSearch(): void {
        this.search.setValue('')
        const filterValue = ''
        this.filterValue = filterValue
        this.dataSource.filter = filterValue.trim().toLowerCase()
        this.paginator.length = this.dataSource.filteredData.length
    }

    applyAutocompleteSelect(event: MatAutocompleteSelectedEvent) {
        const filterValue = event.option.value
        this.filterValue = filterValue
        this.dataSource.filter = filterValue.trim().toLowerCase()
        this.paginator.length = this.dataSource.filteredData.length
    }

    applyCategoryFilter(event: MatSelectChange) {
        if (event.value.length == 0) {
            this.dataSource = new MatTableDataSource(this.elements)
            this.dataSource.sort = this.sort
            this.dataSource.paginator = this.paginator
            this.dataSource.filter = this.filterValue.trim().toLowerCase()
            this.paginator.length = this.dataSource.filteredData.length
        } else {
            this.dataSource = new MatTableDataSource(
                this.elements.filter((e) =>
                    event.value.includes(e.categoryName)
                )
            )
            this.dataSource.sort = this.sort
            this.dataSource.paginator = this.paginator
            this.dataSource.filter = this.filterValue.trim().toLowerCase()
            this.paginator.length = this.dataSource.filteredData.length
        }
    }

    clearFilter() {
        this.filter.setValue(null)
        this.dataSource = new MatTableDataSource(this.elements)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.dataSource.filter = this.filterValue.trim().toLowerCase()
        this.paginator.length = this.dataSource.filteredData.length
    }

    resetData() {
        // this.resetDataSpinner$.next(true)
        // this.elementService
        //     .resetData()
        //     .pipe(
        //         switchMap(() => {
        //             return this.appStore.user$
        //         }),
        //         switchMap((user) => {
        //             return this.elementService.getElementDataByUserId(user.id)
        //         }),
        //         tap((data) => {
        //             this.basicFeatureStore.initialize(data)
        //             this.resetDataSpinner$.next(false)
        //         }),
        //         takeUntilDestroyed(this.destroyRef)
        //     )
        //     .subscribe()
    }

    openAddModal(categories: ElementCategoryDto[]) {
        this.dialog.open(TableAddDialogComponent, {
            ...fullscreenDialogConfig,
            data: {
                categories: categories,
            },
        })
    }

    openEditModal(element: ElementDetailDto, categories: ElementCategoryDto[]) {
        this.dialog.open(TableEditDialogComponent, {
            ...fullscreenDialogConfig,
            data: {
                element: element,
                categories: categories,
            },
        })
    }

    openDeleteModal(element: ElementDetailDto) {
        this.dialog.open(TableDeleteDialogComponent, {
            autoFocus: false,
            data: element,
        })
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase()
        return this.autocompleteOptions.filter((option) =>
            option.toLowerCase().includes(filterValue)
        )
    }
}
