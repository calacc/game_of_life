import { inject, Injectable } from '@angular/core'
import { FirebaseStorageService } from './firebase-storage/firebase-storage.service'

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private readonly provider = inject(FirebaseStorageService)

    upload(path: string, file: File) {
        return this.provider.upload(path, file)
    }

    download(path: string) {
        return this.provider.download(path)
    }

    delete(path: string) {
        return this.provider.delete(path)
    }
}
