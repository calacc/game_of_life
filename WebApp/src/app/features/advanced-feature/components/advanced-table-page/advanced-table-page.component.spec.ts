import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdvancedTablePageComponent } from './advanced-table-page.component'

describe('AdvancedTablePageComponent', () => {
    let component: AdvancedTablePageComponent
    let fixture: ComponentFixture<AdvancedTablePageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdvancedTablePageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AdvancedTablePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
