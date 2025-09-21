import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const skipEndpoints = ['/login', '/register', '/charts'];
  const shouldSkip = skipEndpoints.some(endpoint => req.url.includes(endpoint));

  if (shouldSkip) {
    return next(req);
  }

  const token = localStorage.getItem('token');

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
