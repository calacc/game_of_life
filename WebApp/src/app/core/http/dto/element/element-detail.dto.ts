import { ElementDto } from './element.dto'

import { ElementCategoryDto } from './element-category.dto'

export interface ElementDetailDto extends ElementDto {
    category: ElementCategoryDto
}
