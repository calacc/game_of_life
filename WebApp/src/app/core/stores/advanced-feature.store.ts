import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { ElementDetailDto } from '../http/dto/element/element-detail.dto'
import { ElementCategoryDto } from '../http/dto/element/element-category.dto'
import { Observable } from 'rxjs'
import { ElementDataDto } from '../http/dto/element/element-data.dto'
import { EditElementDto } from '../http/dto/element/edit-element.dto'

export interface BasicFeatureState {
    elements: ElementDetailDto[]
    categories: ElementCategoryDto[]
    init: boolean
}

@Injectable({
    providedIn: 'root',
})
export class AdvancedFeatureStore extends ComponentStore<BasicFeatureState> {
    public init$: Observable<boolean> = this.select((s) => s.init)
    public elementData$: Observable<ElementDataDto> = this.select((s) => ({
        elements: s.elements,
        categories: s.categories,
    }))

    public initialize = this.updater((state, value: ElementDataDto) => {
        return {
            elements: [...value.elements],
            categories: [...value.categories],
            init: true,
        }
    })

    public makeElementInvisibleById = this.updater((state, value: number) => {
        return {
            elements: state.elements.map((e) => {
                if (e.id == value) {
                    e.isVisible = false
                    return e
                } else {
                    return e
                }
            }),
            categories: state.categories,
            init: state.init,
        }
    })
    public makeElementVisibleById = this.updater((state, value: number) => {
        return {
            elements: state.elements.map((e) => {
                if (e.id == value) {
                    e.isVisible = true
                    return e
                } else {
                    return e
                }
            }),
            categories: state.categories,
            init: state.init,
        }
    })
    public deleteElementById = this.updater((state, value: number) => {
        const updatedElements = state.elements
            .filter((e) => e.id !== value)
            .map((e, index) => ({ ...e, position: index + 1 }))

        return {
            ...state,
            elements: updatedElements,
        }
    })

    public editElementById = this.updater(
        (
            state,
            value: { elementId: number; editedElement: EditElementDto }
        ) => {
            const elementIndex = state.elements.findIndex(
                (e) => e.id === value.elementId
            )
            const updatedElement: ElementDetailDto = {
                ...state.elements[elementIndex],
                ...value.editedElement,
            }

            return {
                ...state,
                elements: [
                    ...state.elements.slice(0, elementIndex),
                    updatedElement,
                    ...state.elements.slice(elementIndex + 1),
                ],
            }
        }
    )

    public addElement = this.updater((state, value: ElementDetailDto) => {
        return {
            ...state,
            elements: [...state.elements, value],
        }
    })

    constructor() {
        super({
            elements: [],
            categories: [],
            init: false,
        })
    }
}
