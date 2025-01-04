import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatButton, MatIconButton } from '@angular/material/button'
import { NgForOf, NgIf } from '@angular/common'

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [MatIcon, MatButton, NgIf, MatIconButton, NgForOf],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
    @Output() uploadChange: EventEmitter<File[]> = new EventEmitter<File[]>()
    @Input() accept = '*/*'
    @Input() detail = ''
    files: File[] = []

    onFileInputChange(event: Event) {
        const eventTarget = event.target
        if (eventTarget) {
            const fileInput = eventTarget as HTMLInputElement
            if (fileInput.files && fileInput.files.length > 0) {
                this.files.push(fileInput.files[0])
                this.uploadChange.emit(this.files)
            } else {
                this.files = []
                this.uploadChange.emit([])
            }
        }
    }

    deleteFile(fileInput: HTMLInputElement, index: number) {
        if (fileInput.files) {
            const fileArray = Array.from(fileInput.files)
            fileArray.splice(index, 1)
            const newFileList = new DataTransfer()
            fileArray.forEach((file) => newFileList.items.add(file))
            fileInput.files = newFileList.files
        }
        this.files.splice(index, 1)
        this.uploadChange.emit(this.files)
    }
}
