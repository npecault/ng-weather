import {HttpContextToken, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {CacheService} from '../services/cache/cache.service';
import {filter} from 'rxjs/operators';

export const NoCacheToken = new HttpContextToken<boolean>(() => false);

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cache = inject(CacheService);

  if (req.context.get(NoCacheToken)) {
    return next(req);
  }

  // Cached HTTP responses are not instances of HttpResponse but only objects.
  // We need to transform back cached responses to instances of the class.
  return cache.match<{ [key in keyof HttpResponse<unknown>]: HttpResponse<unknown>[key] }, HttpResponse<unknown>>(
    req.url,
    next(req).pipe(filter(event => event instanceof HttpResponse)),
    cachedResponse => new HttpResponse({body: cachedResponse.body}));
};
