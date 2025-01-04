import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { UserDto } from '../../dto/user/user.dto'
import { EnvironmentService } from '../../../services/environment/environment.service'
import { CreateUserDto } from '../../dto/user/create-user.dto'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly http = inject(HttpClient)
    private readonly environment = inject(EnvironmentService)
    private readonly baseUrl

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/User'
    }

    public getByToken(): Observable<UserDto> {
        return this.http.get<UserDto>(`${this.baseUrl}/GetByToken`)
    }

    public createByToken(): Observable<UserDto> {
        return this.http.post<UserDto>(`${this.baseUrl}/CreateByToken`, {})
    }
}
