import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    Input,
} from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { ElementDetailDto } from '../../../../core/http/dto/element/element-detail.dto'
import { AdvancedFeatureStore } from '../../../../core/stores/advanced-feature.store'
import { ElementService } from '../../../../core/http/services/element/element.service'
import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-is-visible-button',
    standalone: true,
    imports: [MatIconButton, MatIcon, AsyncPipe],
    templateUrl: './is-visible-button.component.html',
    styleUrl: './is-visible-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsVisibleButtonComponent {
    private readonly basicFeatureStore = inject(AdvancedFeatureStore)
    private readonly elementService = inject(ElementService)
    private readonly destroyRef = inject(DestroyRef)
    spinner$ = new BehaviorSubject<boolean>(false)
    @Input() element!: ElementDetailDto

    makeVisible() {
        this.spinner$.next(true)
        this.elementService
            .makeVisibleById(this.element.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.basicFeatureStore.makeElementVisibleById(
                        this.element.id
                    )
                    this.spinner$.next(false)
                },
            })
    }

    makeInvisible() {
        this.spinner$.next(true)
        this.elementService
            .makeInvisibleById(this.element.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.basicFeatureStore.makeElementInvisibleById(
                        this.element.id
                    )
                    this.spinner$.next(false)
                },
            })
    }
}
