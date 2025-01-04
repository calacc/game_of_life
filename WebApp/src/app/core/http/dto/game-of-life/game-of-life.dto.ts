import { CellDto } from './cell.dto'
import { ResourceDto } from './resource.dto'

export interface GameOfLifeDto {
    id: number
    started: boolean
    startingNrSexualCells: number
    startingNrAsexualCells: number
    startingNrResources: number
    mapSize: number
    cells: CellDto[]
    resources: ResourceDto[]
}
