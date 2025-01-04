import { ElementDetailDto } from './element-detail.dto'
import { ElementCategoryDto } from './element-category.dto'

export interface ElementDataDto {
    elements: ElementDetailDto[]
    categories: ElementCategoryDto[]
}
