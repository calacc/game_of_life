export interface CellDto {
    id: number
    x: number
    y: number
    foodEaten: number
    state: 'HUNGRY' | 'FULL' | 'STARVED' // Update as per all possible states
    t_Full: number
    t_Starve: number
}
