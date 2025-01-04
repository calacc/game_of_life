import { inject, Injectable } from '@angular/core'
import {
    catchError,
    from,
    map,
    Observable,
    of,
    switchMap,
    take,
    throwError,
} from 'rxjs'
import { FirebaseService } from '../firebase/firebase.service'
import {
    createUserWithEmailAndPassword,
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    User,
} from 'firebase/auth'
import { AppStore } from '../../stores/app.store'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly firebase = inject(FirebaseService)
    private readonly firebaseAuth
    private readonly appStore = inject(AppStore)

    constructor() {
        console.log('Initialized Firebase Auth')
        this.firebaseAuth = getAuth(this.firebase.getApp())
    }

    // Email Login
    signupWithEmail(email: string, password: string): Observable<User> {
        return from(
            createUserWithEmailAndPassword(this.firebaseAuth, email, password)
        ).pipe(
            switchMap((result) => {
                localStorage.setItem('refresh', result.user.refreshToken)
                const email = result.user.email
                if (email) {
                    return of(result.user)
                }
                return throwError(() => new Error('Email is null'))
            })
        )
    }

    loginWithEmail(email: string, password: string): Observable<User> {
        return from(
            signInWithEmailAndPassword(this.firebaseAuth, email, password)
        ).pipe(
            switchMap((result) => {
                return of(result.user)
            })
        )
    }

    // Popup Google Login - Used in Development
    signupWithGoogle(): Observable<User> {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
        })
        return from(signInWithPopup(this.firebaseAuth, provider)).pipe(
            switchMap((result) => {
                const email = result.user.email
                if (email) {
                    return of(result.user)
                }
                return throwError(() => new Error('Email is null'))
            })
        )
    }

    loginWithGoogle(): Observable<User> {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
            ux_mode: 'redirect',
        })
        return from(signInWithPopup(this.firebaseAuth, provider)).pipe(
            switchMap((result) => {
                return of(result.user)
            })
        )
    }

    // Redirect Google Login - Used in Production
    loginWithGoogleRedirect() {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
        })
        signInWithRedirect(this.firebaseAuth, new GoogleAuthProvider())
    }

    getRedirectResult(): Observable<User> {
        return from(getRedirectResult(this.firebaseAuth)).pipe(
            switchMap((result) => {
                if (result) {
                    return of(result.user)
                } else {
                    return throwError(() => new Error())
                }
            })
        )
    }

    // Utilities
    sendPasswordResetEmail(email: string) {
        return from(sendPasswordResetEmail(this.firebaseAuth, email))
    }

    logOut() {
        this.appStore.logOut()
        this.firebaseAuth.signOut()
    }

    getFirebaseUser() {
        return new Observable<User | null>((observer) => {
            const unsubscribe = this.firebaseAuth.onAuthStateChanged(
                (user) => {
                    observer.next(user)
                },
                (error) => {
                    observer.error(error)
                },
                () => {
                    observer.complete()
                }
            )
            return () => unsubscribe()
        }).pipe(take(1))
    }

    isLoggedIn(): Observable<boolean> {
        return this.getFirebaseUser().pipe(map((result) => !!result))
    }

    getIdToken() {
        return this.getFirebaseUser().pipe(
            switchMap((firebaseUser) => {
                if (firebaseUser) {
                    return from(firebaseUser.getIdTokenResult()).pipe(
                        map((idTokenResult) => {
                            return idTokenResult.token
                        })
                    )
                } else {
                    return of(null)
                }
            }),
            catchError((error) => {
                console.error('[Auth] Error retrieving Id Token', error)
                return of(null)
            })
        )
    }

    getNewIdToken() {
        return this.getFirebaseUser().pipe(
            switchMap((firebaseUser) => {
                if (firebaseUser) {
                    return from(firebaseUser.getIdToken(true)).pipe()
                } else {
                    return of(null)
                }
            }),
            catchError((error) => {
                console.error('[Auth] Error retrieving Id Token', error)
                return of(null)
            })
        )
    }
}
