import { HttpInterceptorFn } from '@angular/common/http'

export const loggerInterceptor: HttpInterceptorFn = (request, next) => {
    return next(request)
}
