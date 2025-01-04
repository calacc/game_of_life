import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { EnvironmentService } from '../../../services/environment/environment.service'
import { Observable } from 'rxjs'
import { ElementDataDto } from '../../dto/element/element-data.dto'
import { EditElementDto } from '../../dto/element/edit-element.dto'
import { CreateElementDto } from '../../dto/element/create-element.dto'
import { ElementDetailDto } from '../../dto/element/element-detail.dto'

@Injectable({
    providedIn: 'root',
})
export class ElementService {
    private readonly http = inject(HttpClient)
    private readonly environment = inject(EnvironmentService)
    private readonly baseUrl

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/Element'
    }

    public getElementDataByUserId(userId: string): Observable<ElementDataDto> {
        return this.http.get<ElementDataDto>(
            `${this.baseUrl}/GetDataByUserId/${userId}`
        )
    }

    public resetData() {
        return this.http.post(`${this.baseUrl}/ResetData`, {})
    }

    public deleteById(elementId: number) {
        return this.http.delete(`${this.baseUrl}/DeleteById/${elementId}`)
    }

    public editById(elementId: number, editElementDto: EditElementDto) {
        return this.http.put<ElementDetailDto>(
            `${this.baseUrl}/EditById/${elementId}`,
            editElementDto
        )
    }

    public create(elementDataDto: CreateElementDto) {
        return this.http.post<ElementDetailDto>(
            `${this.baseUrl}/Create`,
            elementDataDto
        )
    }

    public makeVisibleById(elementId: number) {
        return this.http.patch(
            `${this.baseUrl}/MakeVisibleById/${elementId}`,
            {}
        )
    }

    public makeInvisibleById(elementId: number) {
        return this.http.patch(
            `${this.baseUrl}/MakeInvisibleById/${elementId}`,
            {}
        )
    }
}
