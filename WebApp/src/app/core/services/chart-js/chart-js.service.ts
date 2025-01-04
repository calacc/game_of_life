import { Injectable } from '@angular/core'
import { Chart, registerables } from 'chart.js'
@Injectable({
    providedIn: 'root',
})
export class ChartJsService {
    private isRegistered = false
    private readonly mainColor = '#026e00' // Blue
    private readonly secondaryColor = '#ff6600' // Orange
    private readonly tertiaryColor = '#cccccc' // Light Gray

    getMainColor(opacity: null | number = null) {
        if (!opacity || opacity < 0 || opacity > 99) {
            return this.mainColor
        }
        if (opacity < 10) {
            return this.mainColor + '0' + opacity
        }
        return this.mainColor + opacity
    }

    initializeChartJs(): void {
        if (!this.isRegistered) {
            Chart.register(...registerables)
            this.isRegistered = true
            console.log('All Chart.js components registered!')
        }
    }
}
