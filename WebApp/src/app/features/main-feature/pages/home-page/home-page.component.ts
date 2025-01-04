import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { HttpClient } from '@angular/common/http'

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [AsyncPipe, JsonPipe, NgIf, MatButton],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
    private readonly http = inject(HttpClient)
    gameOfLifes$ = this.http.get('http://localhost:8080/game-of-life')
}
