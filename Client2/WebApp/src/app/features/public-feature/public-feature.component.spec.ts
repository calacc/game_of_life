import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PublicFeatureComponent } from './public-feature.component'

describe('PublicFeatureComponent', () => {
    let component: PublicFeatureComponent
    let fixture: ComponentFixture<PublicFeatureComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PublicFeatureComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PublicFeatureComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
