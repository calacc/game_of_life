import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BasicLoadingPageComponent } from './basic-loading-page.component'

describe('BasicLoadingPageComponent', () => {
    let component: BasicLoadingPageComponent
    let fixture: ComponentFixture<BasicLoadingPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BasicLoadingPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(BasicLoadingPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
