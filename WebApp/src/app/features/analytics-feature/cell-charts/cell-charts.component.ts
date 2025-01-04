import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    ViewChild,
} from '@angular/core'
import { ActiveTabStore } from '../../../core/stores/active-tab.store'
import { GamesStore } from '../../../core/stores/games.store'
import { GameOfLifeDto } from '../../../core/http/dto/game-of-life/game-of-life.dto'
import { CellDto } from '../../../core/http/dto/game-of-life/cell.dto'
import { JsonPipe } from '@angular/common'
import { Chart } from 'chart.js'
import { ResourceDto } from '../../../core/http/dto/game-of-life/resource.dto'

@Component({
    selector: 'app-cell-charts',
    standalone: true,
    imports: [JsonPipe],
    templateUrl: './cell-charts.component.html',
    styleUrl: './cell-charts.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellChartsComponent implements AfterViewInit {
    private readonly activeTabStore = inject(ActiveTabStore)
    private readonly gameStore = inject(GamesStore)
    games: GameOfLifeDto[] = []
    cells: CellDto[] = []
    @ViewChild('cellChart1') canvasRef!: ElementRef<HTMLCanvasElement>
    @ViewChild('cellChart2') canvasRef2!: ElementRef<HTMLCanvasElement>
    @ViewChild('cellChart3') canvasRef3!: ElementRef<HTMLCanvasElement>
    chart!: Chart
    chart2!: Chart
    chart3!: Chart
    constructor() {
        this.gameStore.state$.subscribe({
            next: (game) => {
                this.games = game.games
                this.cells = game.cells
            },
        })
        this.activeTabStore.setActiveTab('cells')
    }

    computeCellStateDistribution() {
        // Initialize counters for each state
        const stateCounts = {
            HUNGRY: 0,
            FULL: 0,
            STARVED: 0,
        }

        // Count how many cells are in each state
        this.cells.forEach((cell) => {
            stateCounts[cell.state]++
        })
        return [
            { state: 'HUNGRY', count: stateCounts.HUNGRY },
            { state: 'FULL', count: stateCounts.FULL },
            { state: 'STARVED', count: stateCounts.STARVED },
        ]
    }

    ngAfterViewInit(): void {
        const scatterData = this.cells
        const groupedData = scatterData.reduce((acc, cell) => {
            const key = `${cell.x},${cell.y}`
            // @ts-ignore
            acc[key] = acc[key] || []
            // @ts-ignore
            acc[key].push(cell)
            return acc
        }, {})
        const scatterPoints = Object.entries(groupedData).map(
            ([key, cells]) => {
                const [x, y] = key.split(',').map(Number)
                // @ts-ignore
                const size = cells.length * 10
                // @ts-ignore
                return { x, y, size, count: cells.length }
            }
        )
        const canvas = this.canvasRef.nativeElement
        this.chart = new Chart(canvas, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Cell Map Distribution (Size Reflects Density)',
                        data: scatterPoints,
                        backgroundColor: scatterPoints.map(() => '#026e0080'),
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: {
                                size: 14,
                                family: 'Roboto',
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const point = context.raw // Extract data
                                return [
                                    // @ts-ignore
                                    `Coordinates: (${point.x}, ${point.y})`,
                                    // @ts-ignore
                                    `Number of cells: ${point.count}`,
                                ].join('\n')
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'X Coordinate (Map Position)',
                        },
                        min: 0,
                        max: 20,
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Y Coordinate (Map Position)',
                        },
                        min: 0,
                        max: 20,
                    },
                },
                elements: {
                    point: {
                        // @ts-ignore
                        radius: (ctx) => ctx.raw.size, // Use the size property for point radius
                    },
                },
                aspectRatio: 1,
            },
        })
        const canvas2 = this.canvasRef2.nativeElement
        const canvas3 = this.canvasRef3.nativeElement
        // Define the threshold distance for resource consumption
        const thresholdDistance = 2 // Change this value based on how far cells can "reach" resources

        // Calculate resource consumption for each cell
        const resources: ResourceDto[] = []
        this.games.forEach((game) => {
            resources.push(...game.resources)
        })
        const resourceConsumption = this.cells.map((cell) => {
            const nearbyResources = resources.filter((resource) => {
                // Calculate distance between the cell and the resource
                const distance = Math.sqrt(
                    Math.pow(cell.x - resource.row, 2) +
                        Math.pow(cell.y - resource.col, 2)
                )
                return distance <= thresholdDistance // Check if the resource is within the threshold
            })
            return {
                state: cell.state,
                x: cell.x,
                y: cell.y,
                resourceCount: nearbyResources.length,
            }
        })

        // Separate data by cell state
        const stateData = {
            HUNGRY: [],
            FULL: [],
            STARVED: [],
        }

        resourceConsumption.forEach((item) => {
            // @ts-ignore
            stateData[item.state].push(item)
        })

        // Prepare the data for the chart
        const chartData = Object.keys(stateData).map((state) => ({
            label: state,
            // @ts-ignore
            data: stateData[state].map((item) => ({
                x: item.x,
                y: item.y,
                r: item.resourceCount * 10, // Bubble size is based on the number of resources consumed (scale the size)
            })),
            backgroundColor:
                state === 'HUNGRY'
                    ? '#ff660080'
                    : state === 'FULL'
                      ? '#026e0080'
                      : '#cccccc',
        }))

        // Create the chart using the resource consumption data
        this.chart2 = new Chart(canvas2, {
            type: 'bubble',
            data: {
                datasets: chartData.slice(0, 2),
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'X Coordinate (Map Position)',
                        },
                        min: 0,
                        max: 20, // Adjust according to your map size
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Y Coordinate (Map Position)',
                        },
                        min: 0,
                        max: 20, // Adjust according to your map size
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const point = context.raw

                                return [
                                    // @ts-ignore
                                    `Coordinates: (${point.x}, ${point.y})`,
                                    // @ts-ignore
                                    `Resources Consumed: ${point.r / 5}`, // Divide by scale factor
                                ].join('\n')
                            },
                        },
                    },
                },
                aspectRatio: 1,
            },
        })

        const stateDistributionData =
            this.computeCellStateDistribution.call(this)

        // Create the donut chart using the cell state distribution data
        this.chart3 = new Chart(canvas3, {
            type: 'pie', // Donut chart is a variant of a pie chart
            data: {
                labels: stateDistributionData
                    .map(
                        (data: { state: any; count: any }) =>
                            `${data.state} (${data.count})`
                    )
                    .slice(0, 2), // Labels: State + count
                datasets: [
                    {
                        label: 'Cell State Distribution',
                        data: stateDistributionData.map(
                            (data: { count: any }) => data.count
                        ), // Values: Count of cells in each state
                        backgroundColor: [
                            '#026e0090',
                            '#ff660090',
                            '#cccccc90',
                        ],
                        borderColor: ['#026e0090', '#ff660090', '#cccccc90'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                cutout: '60%', // This creates the hole in the center to make it a donut chart
                plugins: {
                    legend: {
                        display: true,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.raw} cells` // Display count on hover
                            },
                        },
                    },
                },
            },
        })
    }
}
