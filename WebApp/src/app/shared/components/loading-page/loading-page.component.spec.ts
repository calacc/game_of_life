import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoadingPageComponent } from './loading-page.component'

describe('BasicLoadingPageComponent', () => {
    let component: LoadingPageComponent
    let fixture: ComponentFixture<LoadingPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoadingPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LoadingPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
