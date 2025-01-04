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
    @ViewChild('cellChart2') canvasRef3!: ElementRef<HTMLCanvasElement>
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
        // Initialize an array to hold the total resource consumption for each game
        const totalConsumptionPerGame: {
            gameId: number
            totalConsumed: number
        }[] = []

        // Iterate through each game to compute the total resources consumed
        this.games.forEach((game) => {
            let totalConsumed = 0

            // For each resource, count how many cells are consuming it
            game.resources.forEach((resource) => {
                const nearbyCells = this.cells.filter((cell) => {
                    // Calculate distance between cell and resource
                    const distance = Math.sqrt(
                        Math.pow(cell.x - resource.row, 2) +
                            Math.pow(cell.y - resource.col, 2)
                    )
                    return distance <= 2 // Threshold distance for consumption
                })

                // If there are cells near the resource, add to total consumption
                totalConsumed += nearbyCells.length
            })

            // Store the total consumption for this game
            totalConsumptionPerGame.push({
                gameId: game.id,
                totalConsumed,
            })
        })

        // Return the computed data for use in chart
        return totalConsumptionPerGame
    }

    ngAfterViewInit(): void {
        const canvas = this.canvasRef.nativeElement
        // Call the function to get total consumption data
        const consumptionData = this.computeTotalResourceConsumption.call(this)

        // Create the bar chart to visualize total resource consumption per game
        this.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: consumptionData.map(
                    (data: { gameId: any }) => `Game ${data.gameId}`
                ), // X-axis labels: Game identifiers
                datasets: [
                    {
                        label: 'Total Resources Consumed',
                        data: consumptionData.map(
                            (data: { totalConsumed: any }) => data.totalConsumed
                        ), // Y-axis data: Total resources consumed
                        backgroundColor: '#ff660080',
                        borderColor: '#ff6600',
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
                            text: 'Total Resources Consumed',
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context: { raw: any }) {
                                return `Consumed: ${context.raw} resources`
                            },
                        },
                    },
                },
            },
        })
    }
}
