import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    ViewChild,
} from '@angular/core'
import { ActiveTabStore } from '../../../core/stores/active-tab.store'
import { GameOfLifeDto } from '../../../core/http/dto/game-of-life/game-of-life.dto'
import { CellDto } from '../../../core/http/dto/game-of-life/cell.dto'
import { GamesStore } from '../../../core/stores/games.store'
import { JsonPipe } from '@angular/common'
import { ChartJsService } from '../../../core/services/chart-js/chart-js.service'
import { Chart } from 'chart.js'

@Component({
    selector: 'app-game-charts',
    standalone: true,
    imports: [JsonPipe],
    templateUrl: './game-charts.component.html',
    styleUrl: './game-charts.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameChartsComponent {
    private readonly activeTabStore = inject(ActiveTabStore)
    private readonly gameStore = inject(GamesStore)
    private readonly chartJsService = inject(ChartJsService)
    games: GameOfLifeDto[] = []
    cells: CellDto[] = []
    @ViewChild('cellChart1') canvasRef!: ElementRef<HTMLCanvasElement>
    @ViewChild('cellChart2') canvasRef2!: ElementRef<HTMLCanvasElement>
    @ViewChild('cellChart3') canvasRef3!: ElementRef<HTMLCanvasElement>
    chart!: Chart
    chart2!: Chart
    chart3!: Chart
    constructor() {
        this.activeTabStore.setActiveTab('games')
        this.gameStore.state$.subscribe({
            next: (game) => {
                this.games = game.games
                this.cells = game.cells
            },
        })
    }

    computeTotalResourceConsumption() {
        const totalConsumptionPerGame: {
            gameId: number
            totalConsumed: number
        }[] = []
        this.games.forEach((game) => {
            let totalConsumed = 0
            game.resources.forEach((resource) => {
                const nearbyCells = this.cells.filter((cell) => {
                    const distance = Math.sqrt(
                        Math.pow(cell.x - resource.row, 2) +
                            Math.pow(cell.y - resource.col, 2)
                    )
                    return distance <= 2
                })
                totalConsumed += nearbyCells.length
            })
            totalConsumptionPerGame.push({
                gameId: game.id,
                totalConsumed,
            })
        })
        return totalConsumptionPerGame
    }

    ngAfterViewInit(): void {
        const canvas = this.canvasRef.nativeElement
        const canvas2 = this.canvasRef2.nativeElement
        const canvas3 = this.canvasRef3.nativeElement
        const densityData = this.computeCellDensity()

        // Create a bar chart for cell density
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: densityData.map((data) => `Game ${data.gameId}`), // X-axis labels: Game identifiers
                datasets: [
                    {
                        label: 'Average Cell Density',
                        data: densityData.map((data) => data.density),
                        backgroundColor: '#4caf5080', // Semi-transparent green
                        borderColor: '#4caf50', // Solid green border
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Density (Cells per Unit Area)',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Games',
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                // @ts-ignore
                                return `Density: ${context.raw.toFixed(3)} cells/unit²`
                            },
                        },
                    },
                },
            },
        })
        const totalCellsData = this.games.map((game) => ({
            gameId: game.id,
            totalCells: game.cells.length, // Number of cells in the cells array
        }))

        // Create a horizontal bar chart
        new Chart(canvas2, {
            type: 'bar',
            data: {
                labels: totalCellsData.map((data) => `Game ${data.gameId}`), // Labels for each game
                datasets: [
                    {
                        label: 'Total Cells in Game',
                        data: totalCellsData.map((data) => data.totalCells), // Number of cells
                        backgroundColor: '#ff660090', // Green color
                        borderColor: '#ff6600',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                indexAxis: 'y', // Horizontal bars
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Cells',
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context: { raw: any }) {
                                return `Total Cells: ${context.raw}`
                            },
                        },
                    },
                },
            },
        })
        const cellComparisonData = this.games.map((game) => ({
            gameId: game.id,
            initialSexual: game.startingNrSexualCells,
            initialAsexual: game.startingNrAsexualCells,
            finalCells: game.cells.length, // Final total number of cells
        }))

        // Create a grouped bar chart
        new Chart(canvas3, {
            type: 'bar',
            data: {
                labels: cellComparisonData.map((data) => `Game ${data.gameId}`), // X-axis labels: Game identifiers
                datasets: [
                    {
                        label: 'Initial Sexual Cells',
                        data: cellComparisonData.map(
                            (data) => data.initialSexual
                        ),
                        backgroundColor: '#ff660090', // Blue color
                        stack: 'Initial', // Group as "Initial"
                    },
                    {
                        label: 'Initial Asexual Cells',
                        data: cellComparisonData.map(
                            (data) => data.initialAsexual
                        ),
                        backgroundColor: '#ab47bc90', // Purple color
                        stack: 'Initial',
                    },
                    {
                        label: 'Final Cells',
                        data: cellComparisonData.map((data) => data.finalCells),
                        backgroundColor: '#66bb6a90', // Green color
                        stack: 'Final', // Separate group for "Final"
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        stacked: true, // Enable stacking on the x-axis
                        title: {
                            display: true,
                            text: 'Games',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        stacked: true, // Enable stacking on the y-axis
                        title: {
                            display: true,
                            text: 'Number of Cells',
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context: {
                                dataset: any
                                raw: any
                            }) {
                                return `${context.dataset.label}: ${context.raw}`
                            },
                        },
                    },
                },
            },
        })
    }
    computeCellDensity() {
        // Compute cell density per game
        const densityData = this.games.map((game) => {
            const totalCells = game.cells.length
            const mapArea = game.mapSize * game.mapSize
            const density = totalCells / mapArea

            return {
                gameId: game.id,
                density: density, // Average density of cells
            }
        })

        return densityData
    }
}
