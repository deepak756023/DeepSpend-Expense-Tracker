import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  const token = localStorage.getItem('jwtToken');
  console.log('Token from Interceptor:', token);
  debugger;

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
