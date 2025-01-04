import { TestBed } from '@angular/core/testing'

import { DrawerContentService } from './drawer-content.service'

describe('DrawerContentService', () => {
    let service: DrawerContentService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(DrawerContentService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
