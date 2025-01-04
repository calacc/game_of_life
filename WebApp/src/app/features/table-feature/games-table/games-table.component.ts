import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewChild,
} from '@angular/core'
import { ActiveTabStore } from '../../../core/stores/active-tab.store'
import { AsyncPipe, JsonPipe } from '@angular/common'
import { GamesStore } from '../../../core/stores/games.store'
import { GameOfLifeDto } from '../../../core/http/dto/game-of-life/game-of-life.dto'
import { CellDto } from '../../../core/http/dto/game-of-life/cell.dto'
import { ResourceDto } from '../../../core/http/dto/game-of-life/resource.dto'
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
import { ElementTable } from '../../../shared/templates/table/table-page/table-page.component'
import { MatSort, MatSortHeader } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { map, Observable, startWith } from 'rxjs'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { IsVisibleButtonComponent } from '../../../shared/templates/table/is-visible-button/is-visible-button.component'
import {
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption,
} from '@angular/material/autocomplete'
import { MatButton, MatIconButton } from '@angular/material/button'
import {
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
} from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatSelect, MatSelectTrigger } from '@angular/material/select'
import { fadeInAnimation } from '../../../app.animations'

export interface GamesTableData {
    id: number
    started: boolean
    startingNrSexualCells: number
    startingNrAsexualCells: number
    startingNrResources: number
    mapSize: number
    endNrCells: number
    endNrResources: number
}

@Component({
    selector: 'app-games-table',
    standalone: true,
    imports: [
        JsonPipe,
        AsyncPipe,
        IsVisibleButtonComponent,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatButton,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatFormField,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatOption,
        MatPaginator,
        MatPrefix,
        MatRow,
        MatRowDef,
        MatSelect,
        MatSelectTrigger,
        MatSort,
        MatSortHeader,
        MatSuffix,
        MatTable,
        ReactiveFormsModule,
        MatHeaderCellDef,
    ],
    templateUrl: './games-table.component.html',
    animations: [fadeInAnimation],
    styleUrl: './games-table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesTableComponent {
    private readonly activeTabStore = inject(ActiveTabStore)
    private readonly gameStore = inject(GamesStore)
    @ViewChild(MatSort) sort!: MatSort
    @ViewChild(MatPaginator) paginator!: MatPaginator
    games: GameOfLifeDto[] = []
    cells: CellDto[] = []
    displayedColumns: string[] = [
        'id',
        'started',
        'startingNrSexualCells',
        'startingNrAsexualCells',
        'startingNrResources',
        'mapSize',
        'endNrResources',
        'endNrCells',
    ]
    tableWidth = 'auto'
    dataSource: MatTableDataSource<GamesTableData> =
        new MatTableDataSource<GamesTableData>([])
    data: GamesTableData[] = []
    filteredOptions!: Observable<string[]>
    search = new FormControl()
    filterValue = ''
    constructor() {
        this.activeTabStore.setActiveTab('games')
        this.gameStore.state$.subscribe({
            next: (game) => {
                this.games = game.games
                this.cells = game.cells
                console.log(this.games[0].cells)
                let gamesAux: GamesTableData[] = this.games.map((g) => ({
                    id: g.id,
                    started: g.started,
                    startingNrAsexualCells: g.startingNrAsexualCells,
                    startingNrResources: g.startingNrResources,
                    startingNrSexualCells: g.startingNrSexualCells,
                    mapSize: g.mapSize,
                    endNrCells: g.cells.length,
                    endNrResources: g.cells.length,
                }))
                this.dataSource = new MatTableDataSource<GamesTableData>(
                    gamesAux
                )
                this.data = gamesAux
                this.dataSource.sort = this.sort
                this.dataSource.paginator = this.paginator
            },
        })
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        const table = document.querySelector('#table')
        if (table) {
            this.tableWidth = table.scrollWidth + 'px'
        }
    }

    applySearch(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
        this.filterValue = filterValue
        this.dataSource.filter = filterValue.trim().toLowerCase()
        this.paginator.length = this.dataSource.filteredData.length
    }
}
