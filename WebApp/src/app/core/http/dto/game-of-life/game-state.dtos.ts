// State can be an enum or another interface depending on its type.
export interface CellState {
    x: number
    y: number
    isAlive: boolean
    state: State
}

export interface GameState {
    started: boolean
    cells: number
    resources: Resource[]
    map: number[][]
    activeCells: CellState[]
}

export type State = 'ALIVE' | 'DEAD'
export interface Resource {
    id: number
    name: string
}
