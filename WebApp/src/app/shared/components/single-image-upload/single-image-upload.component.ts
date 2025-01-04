import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { NgIf } from '@angular/common'
import { GetFileUrlPipe } from '../../pipes/get-file-url/get-file-url.pipe'

@Component({
    selector: 'app-single-image-upload',
    standalone: true,
    imports: [
        MatIcon,
        MatButton,
        MatIconButton,
        MatProgressSpinner,
        NgIf,
        GetFileUrlPipe,
    ],
    templateUrl: './single-image-upload.component.html',
    styleUrl: './single-image-upload.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleImageUploadComponent {
    widthPx = '250px'
    heightPx = '250px'
    totalWidthPx = '307px'
    @Input() loading = false
    @Output() uploadChange: EventEmitter<File | null> =
        new EventEmitter<File | null>()

    @Input() file: File | null = null
    randomId = Math.random().toString(36).substring(2, 15)

    @Input()
    set width(value: number) {
        this.widthPx = value + 'px'
        this.totalWidthPx = value + 57 + 'px'
    }

    @Input()
    set heigth(value: number) {
        this.heightPx = value + 'px'
    }

    @Input()
    set size(value: number) {
        this.widthPx = value + 'px'
        this.totalWidthPx = value + 57 + 'px'
        this.heightPx = value + 'px'
    }

    onFileInputChange(event: Event) {
        const eventTarget = event.target
        if (eventTarget) {
            const fileInput = eventTarget as HTMLInputElement
            if (fileInput.files && fileInput.files.length > 0) {
                this.file = fileInput.files[0]
                this.uploadChange.emit(this.file)
            } else {
                this.file = null
                this.uploadChange.emit(null)
            }
        }
    }

    deleteFile() {
        this.file = null
        this.uploadChange.emit(this.file)
    }
}
