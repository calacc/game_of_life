import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    ViewChild,
} from '@angular/core'
import { Chart } from 'chart.js'
import { ChartJsService } from '../../../../core/services/chart-js/chart-js.service'

@Component({
    selector: 'app-bar-chart',
    standalone: true,
    imports: [],
    templateUrl: './bar-chart.component.html',
    styleUrl: './bar-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements AfterViewInit {
    private readonly chartJsService = inject(ChartJsService)
    @ViewChild('myChart') canvasRef!: ElementRef<HTMLCanvasElement>
    chart!: Chart

    constructor() {
        this.chartJsService.initializeChartJs()
    }
    ngAfterViewInit(): void {
        const canvas = this.canvasRef.nativeElement
        this.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: [
                    'North America',
                    'Europe',
                    'Asia',
                    'South America',
                    'Africa',
                    'Oceania',
                ],
                datasets: [
                    {
                        label: 'Sales Revenue (in USD)',
                        data: [120000, 95000, 115000, 72000, 30000, 25000],
                        backgroundColor: this.chartJsService.getMainColor(),
                        borderWidth: 1,
                        hoverBackgroundColor:
                            this.chartJsService.getMainColor(90), // Hover effect for bars
                        hoverBorderColor: this.chartJsService.getMainColor(), // Border color on hover
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        position: 'top', // Position the legend at the top of the chart
                        labels: {
                            font: {
                                size: 14,
                                family: 'Roboto',
                            },
                            color: '#333', // Change the color of the legend labels
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.label}: $${Number(tooltipItem.raw).toLocaleString()} USD` // Custom message
                            },
                            footer: function (tooltipItems) {
                                let total = tooltipItems.reduce(
                                    (sum, item) => sum + Number(item.raw),
                                    0
                                ) // Calculate total sum of dataset
                                return `Total: $${total.toLocaleString()}` // Display total in the footer
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 11, // Change font size for X-axis labels
                                family: 'Roboto', // Set font family for X-axis
                            },
                            color: '#333', // Change the color of X-axis ticks
                        },
                        grid: {
                            color: '#ccc', // Change grid line color
                            lineWidth: 1, // Change grid line width
                        },
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 12,
                                family: 'Roboto',
                            },
                            color: '#444',
                            callback: function (value) {
                                // Format Y-axis numbers (e.g., add 'k' for thousands)
                                if (Number(value) >= 1000) {
                                    return '$' + Number(value) / 1000 + 'k'
                                }
                                return '$' + value
                            },
                        },
                        grid: {
                            color: '#ddd',
                            lineWidth: 1,
                        },
                    },
                },
            },
        })
    }
}
