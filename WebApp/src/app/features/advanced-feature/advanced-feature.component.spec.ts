import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdvancedFeatureComponent } from './advanced-feature.component'

describe('AdvancedFeatureComponent', () => {
    let component: AdvancedFeatureComponent
    let fixture: ComponentFixture<AdvancedFeatureComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdvancedFeatureComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AdvancedFeatureComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
