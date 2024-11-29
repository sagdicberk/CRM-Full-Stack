import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptorFn: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Get token from sessionStorage
  const token = sessionStorage.getItem('token');

  // If the token exists, clone the request and add the Authorization header
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Proceed with the cloned request
    return next(clonedReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          sessionStorage.removeItem('token');
          router.navigate(['login']);
        }
        return throwError(error);
      })
    );
  }

  // Proceed with the original request if there's no token
  return next(req);
};
