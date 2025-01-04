import { ElementDetailDto } from '../http/dto/element/element-detail.dto'
import { ElementCategoryDto } from '../http/dto/element/element-category.dto'
import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { Observable } from 'rxjs'
import { ElementDataDto } from '../http/dto/element/element-data.dto'
import { EditElementDto } from '../http/dto/element/edit-element.dto'
import { GameOfLifeDto } from '../http/dto/game-of-life/game-of-life.dto'
import { CellDto } from '../http/dto/game-of-life/cell.dto'

export interface GamesStoreState {
    games: GameOfLifeDto[]
    cells: CellDto[]
    init: boolean
}

@Injectable({
    providedIn: 'root',
})
export class GamesStore extends ComponentStore<GamesStoreState> {
    public init$: Observable<boolean> = this.select((s) => s.init)
    public initialize = this.updater(
        (state, value: { games: GameOfLifeDto[]; cells: CellDto[] }) => {
            return {
                games: [...value.games],
                cells: [...value.cells],
                init: true,
            }
        }
    )
    constructor() {
        super({
            games: [],
            cells: [],
            init: false,
        })
    }
}
