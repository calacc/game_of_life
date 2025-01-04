import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ToolbarLoadingPageComponent } from './toolbar-loading-page.component'

describe('ToolbarLoadingPageComponent', () => {
    let component: ToolbarLoadingPageComponent
    let fixture: ComponentFixture<ToolbarLoadingPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToolbarLoadingPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ToolbarLoadingPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
