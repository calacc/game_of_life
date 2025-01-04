import { Directive, ElementRef, inject } from '@angular/core'
import { DrawerContentService } from '../../../core/services/drawer-content/drawer-content.service'

@Directive({
    selector: '[appFormAutoFocus]',
    standalone: true,
    exportAs: 'appFormAutoFocus',
})
export class FormAutoFocusDirective {
    private readonly drawerContent = inject(DrawerContentService)
    private readonly el = inject(ElementRef)

    public focus(): void {
        const invalidControl =
            this.el.nativeElement.querySelector('.ng-invalid')
        if (invalidControl) {
            invalidControl.focus()
            const rect = invalidControl.getBoundingClientRect()
            this.drawerContent.scrollBy(rect.top - 120)
        }
    }
}
