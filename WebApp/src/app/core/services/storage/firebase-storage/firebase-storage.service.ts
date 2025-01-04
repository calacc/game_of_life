import { Injectable } from '@angular/core'
import {
    deleteObject,
    getBlob,
    getStorage,
    ref,
    uploadBytes,
    UploadResult,
} from 'firebase/storage'
import { catchError, from, Observable, throwError } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class FirebaseStorageService {
    constructor() {
        console.log('Initialized Firebase Storage')
    }

    upload(path: string, file: File): Observable<UploadResult> {
        const storage = getStorage()
        const storageRef = ref(storage, path)
        return from(uploadBytes(storageRef, file)).pipe(
            catchError((err) => throwError(() => err))
        )
    }

    download(path: string): Observable<Blob> {
        const storage = getStorage()
        const storageRef = ref(storage, path)
        return from(getBlob(storageRef)).pipe(
            catchError((err) => {
                return throwError(() => err)
            })
        )
    }

    delete(path: string) {
        const storage = getStorage()
        const storageRef = ref(storage, path)
        return from(deleteObject(storageRef)).pipe(
            catchError((err) => {
                return throwError(() => err)
            })
        )
    }
}
