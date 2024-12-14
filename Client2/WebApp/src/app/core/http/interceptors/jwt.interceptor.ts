import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { catchError, from, switchMap, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { inject } from '@angular/core'
import { UserStore } from '../../stores/user.store'
import { firebaseConfig } from '../../firebase/firebase-config'

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
    const token = localStorage.getItem('access')
    const userStore = inject(UserStore)
    const router: Router = inject(Router)
    if (token) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        })
    }
    return next(request).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                console.log(
                    '[AUTH] Unauthorized error - Try to get a new Id/Access Token',
                )
                let refreshToken = localStorage.getItem('refresh')
                if (refreshToken === null) {
                    console.log(
                        '[AUTH] No Refresh Token Found - Logging out...',
                    )
                    userStore.logOut()
                    router.navigate(['/private/auth/login'])
                    return throwError(() => error)
                } else {
                    return getNewIdToken(refreshToken).pipe(
                        switchMap((result) => {
                            console.log('[AUTH] New Access Token received')
                            const newToken = result.id_token
                            localStorage.setItem('access', newToken)
                            request = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${newToken}`,
                                },
                            })
                            console.log(
                                `[AUTH] Remake initial request at ${request.url}`,
                            )
                            return next(request)
                        }),
                        catchError((err) => {
                            if (error.status === 401) {
                                console.log(
                                    '[AUTH] Still Unauthorized after getting new token: Logging Out... (Something went wrong when getting new Token)',
                                )
                                userStore.logOut()
                                router.navigate(['/private/auth/login'])
                            }
                            throw new HttpErrorResponse(err)
                        }),
                    )
                }
            } else {
                console.log(
                    'HTTP Error detected but not related to Access Token',
                )
                console.log(error)
                return throwError(() => error)
            }
        }),
    )
}

const getNewIdToken = (refreshToken: string) => {
    const url = `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`
    return from(
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors',
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
        }).then((response: Response) => {
            return response.json()
        }),
    )
}
