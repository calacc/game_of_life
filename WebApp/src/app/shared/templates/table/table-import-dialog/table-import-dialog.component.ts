import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-table-import-dialog',
    standalone: true,
    imports: [],
    templateUrl: './table-import-dialog.component.html',
    styleUrl: './table-import-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableImportDialogComponent {}
