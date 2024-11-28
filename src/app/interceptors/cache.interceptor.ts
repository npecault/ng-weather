import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {CacheService} from '../services/cache/cache.service';
import {filter} from 'rxjs/operators';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cache = inject(CacheService);

  return cache.match<{ [key in keyof HttpResponse<unknown>]: HttpResponse<unknown>[key] }, HttpResponse<unknown>>(
    req.url,
    next(req).pipe(filter(event => event instanceof HttpResponse)),
    cachedResponse => new HttpResponse({body: cachedResponse.body}));
};
