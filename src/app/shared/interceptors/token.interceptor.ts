import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";

import { AuthService } from "../../core/auth.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const token = authService.token;

    if (token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: token
            }
        })
        return next(authReq);
    }

    return next(req);
}