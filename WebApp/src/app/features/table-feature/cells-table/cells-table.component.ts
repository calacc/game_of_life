import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewChild,
} from '@angular/core'
import { ActiveTabStore } from '../../../core/stores/active-tab.store'
import { JsonPipe } from '@angular/common'
import { GamesStore } from '../../../core/stores/games.store'
import { GameOfLifeDto } from '../../../core/http/dto/game-of-life/game-of-life.dto'
import { CellDto } from '../../../core/http/dto/game-of-life/cell.dto'
import { MatSort, MatSortHeader } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
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
import { Observable } from 'rxjs'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { GamesTableData } from '../games-table/games-table.component'
import { MatIcon } from '@angular/material/icon'
import {
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
} from '@angular/material/form-field'
import { MatIconButton } from '@angular/material/button'
import { MatInput } from '@angular/material/input'
import { fadeInAnimation } from '../../../app.animations'

@Component({
    selector: 'app-cells-table',
    standalone: true,
    imports: [
        JsonPipe,
        MatCell,
        MatColumnDef,
        MatHeaderCellDef,
        MatCellDef,
        MatTable,
        MatHeaderCell,
        MatSortHeader,
        MatSort,
        MatHeaderRow,
        MatRowDef,
        MatHeaderRowDef,
        MatRow,
        MatPaginator,
        MatIcon,
        MatSuffix,
        MatPrefix,
        MatIconButton,
        ReactiveFormsModule,
        MatLabel,
        MatFormField,
        MatInput,
    ],
    templateUrl: './cells-table.component.html',
    styleUrl: './cells-table.component.scss',
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellsTableComponent {
    private readonly activeTabStore = inject(ActiveTabStore)
    private readonly gameStore = inject(GamesStore)
    @ViewChild(MatSort) sort!: MatSort
    @ViewChild(MatPaginator) paginator!: MatPaginator
    games: GameOfLifeDto[] = []
    cells: CellDto[] = []
    displayedColumns: string[] = [
        'id',
        'x',
        'y',
        'foodEaten',
        'state',
        'timeFull',
        'timeStarve',
    ]
    tableWidth = 'auto'
    dataSource: MatTableDataSource<CellDto> = new MatTableDataSource<CellDto>(
        []
    )
    data: CellDto[] = []
    filteredOptions!: Observable<string[]>
    search = new FormControl()
    filterValue = ''
    constructor() {
        this.activeTabStore.setActiveTab('cells')
        this.gameStore.state$.subscribe({
            next: (game) => {
                this.games = game.games
                this.cells = game.cells
                this.dataSource = new MatTableDataSource<CellDto>(this.cells)
                this.data = this.cells
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
