import {
    HttpErrorResponse,
    HttpInterceptorFn,
    HttpResponse,
} from '@angular/common/http'
import { catchError, switchMap, tap, throwError } from 'rxjs'
import { inject } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router'

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService)
    const router = inject(Router)
    return next(request).pipe(
        catchError((error) => {
            if (
                error instanceof HttpErrorResponse &&
                (error.status === 401 ||
                    error.status === 403 ||
                    error.status === 400)
            ) {
                console.log(
                    '[Error Interceptor] Unauthorized/Forbidden error: Try to get a new Id Token'
                )
                return authService.getNewIdToken().pipe(
                    switchMap((token) => {
                        if (token) {
                            console.log(
                                '[Error Interceptor] Successfully retrieved new Id Token: Sending previous Request'
                            )
                            request = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${token}`,
                                },
                            })
                            return next(request)
                        } else {
                            console.log(
                                "[Error Interceptor] Couldn't get new Id Token: Logging Out"
                            )
                            authService.logOut()
                            return throwError(() => error)
                        }
                    })
                )
            } else {
                console.log(
                    '[Error Interceptor] HTTP Error detected but not related to Id Token'
                )
                return throwError(() => error)
            }
        }),
        catchError((error) => {
            if (error.status === 401) {
                console.log(
                    '[Error Interceptor] Still Unauthorized after getting new token: Logging Out'
                )
                authService.logOut()
                router.navigate(['auth/login'])
            }
            throw new HttpErrorResponse(error)
        }),
        tap((request) => {
            if (request instanceof HttpResponse) {
            }
        })
    )
}
