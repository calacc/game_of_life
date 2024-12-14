import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PrivateFeatureComponent } from './private-feature.component'

describe('PrivateFeatureComponent', () => {
    let component: PrivateFeatureComponent
    let fixture: ComponentFixture<PrivateFeatureComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PrivateFeatureComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(PrivateFeatureComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
