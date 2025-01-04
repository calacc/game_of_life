import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResetPasswordSuccessPageComponent } from './reset-password-success-page.component'

describe('ResetPasswordSuccessPageComponent', () => {
    let component: ResetPasswordSuccessPageComponent
    let fixture: ComponentFixture<ResetPasswordSuccessPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ResetPasswordSuccessPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ResetPasswordSuccessPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
