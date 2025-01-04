import { inject, Injectable } from '@angular/core'
import { from, Observable, switchMap, throwError } from 'rxjs'
import { UserDto } from '../../../http/dto/user/user.dto'
import { FirebaseService } from '../../firebase/firebase.service'
import {
    createUserWithEmailAndPassword,
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
} from 'firebase/auth'
import { UserService } from '../../../http/services/user/user.service'

@Injectable({
    providedIn: 'root',
})
export class FirebaseAuthService {
    private readonly firebase = inject(FirebaseService)
    private readonly firebaseAuth
    private readonly userService = inject(UserService)

    constructor() {
        this.firebaseAuth = getAuth(this.firebase.getApp())
        console.log('Initialized Firebase Auth')
    }

    signupWithEmail(email: string, password: string) {
        return from(
            createUserWithEmailAndPassword(this.firebaseAuth, email, password),
        ).pipe(
            switchMap((result) => {
                localStorage.setItem('refresh', result.user.refreshToken)
                const email = result.user.email
                if (email) {
                    return from(result.user.getIdToken()).pipe(
                        switchMap((result) => {
                            localStorage.setItem('access', result)
                            return this.userService.createByToken()
                        }),
                    )
                }
                return throwError(() => new Error('Email is null'))
            }),
        )
    }

    loginWithEmail(email: string, password: string): Observable<UserDto> {
        return from(
            signInWithEmailAndPassword(this.firebaseAuth, email, password),
        ).pipe(
            switchMap((result) => {
                localStorage.setItem('refresh', result.user.refreshToken)
                return from(result.user.getIdToken()).pipe(
                    switchMap((result) => {
                        localStorage.setItem('access', result)
                        return this.userService.getByToken()
                    }),
                )
            }),
        )
    }

    // not ideal
    signupWithGoogle(): Observable<UserDto> {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
        })
        return from(signInWithPopup(this.firebaseAuth, provider)).pipe(
            switchMap((result) => {
                localStorage.setItem('refresh', result.user.refreshToken)
                const email = result.user.email
                if (email) {
                    return from(result.user.getIdToken()).pipe(
                        switchMap((result) => {
                            localStorage.setItem('access', result)
                            return this.userService.createByToken()
                        }),
                    )
                }
                return throwError(() => new Error('Email is null'))
            }),
        )
    }

    // not ideal
    loginWithGoogle(): Observable<UserDto> {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
            ux_mode: 'redirect',
        })
        return from(signInWithPopup(this.firebaseAuth, provider)).pipe(
            switchMap((result) => {
                localStorage.setItem('refresh', result.user.refreshToken)
                return from(result.user.getIdToken()).pipe(
                    switchMap((result) => {
                        console.log(result)
                        localStorage.setItem('access', result)
                        return this.userService.getByToken()
                    }),
                )
            }),
        )
    }

    loginWithGoogleRedirect() {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
        })
        signInWithRedirect(this.firebaseAuth, new GoogleAuthProvider())
    }

    sendPasswordResetEmail(email: string) {
        return from(sendPasswordResetEmail(this.firebaseAuth, email))
    }

    logOut() {
        this.firebaseAuth.signOut()
    }

    getRedirectResult() {
        return from(getRedirectResult(this.firebaseAuth)).pipe(
            switchMap((result) => {
                if (result) {
                    localStorage.setItem('refresh', result.user.refreshToken)
                    return from(result.user.getIdToken()).pipe(
                        switchMap((result) => {
                            localStorage.setItem('access', result)
                            return this.userService.getByToken()
                        }),
                    )
                } else {
                    return throwError(() => new Error())
                }
            }),
        )
    }
}
