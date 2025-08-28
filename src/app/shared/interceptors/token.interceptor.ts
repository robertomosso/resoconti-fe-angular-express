import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

import { AuthService } from "../../core/auth.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const token = authService.token;

    let authReq = req;

    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: token
            }
        });
    }

    return next(authReq).pipe(
        catchError(err => {
            if (err.status === 401) {
                authService.logout();
            }
            return throwError(() => err);
        })
    );
}