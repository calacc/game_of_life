import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DrawerNavigationPageComponent } from './drawer-navigation-page.component'

describe('DrawerNavigationPageComponent', () => {
    let component: DrawerNavigationPageComponent
    let fixture: ComponentFixture<DrawerNavigationPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DrawerNavigationPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(DrawerNavigationPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
