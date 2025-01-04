import { inject, Injectable } from '@angular/core'
import { FirebaseAuthService } from './firebase-auth/firebase-auth.service'
import { Observable } from 'rxjs'
import { UserDto } from '../../http/dto/user/user.dto'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly provider = inject(FirebaseAuthService)

    signupWithEmail(email: string, password: string): Observable<UserDto> {
        return this.provider.signupWithEmail(email, password)
    }

    loginWithEmail(email: string, password: string): Observable<UserDto> {
        return this.provider.loginWithEmail(email, password)
    }

    signupWithGoogle(): Observable<UserDto> {
        return this.provider.signupWithGoogle()
    }

    loginWithGoogle(): Observable<UserDto> {
        return this.provider.loginWithGoogle()
    }

    loginWithGoogleRedirect() {
        this.provider.loginWithGoogleRedirect()
    }

    logOut() {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        this.provider.logOut()
    }

    getRedirectResult() {
        return this.provider.getRedirectResult()
    }
}
