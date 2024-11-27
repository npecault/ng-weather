import {inject, Injectable} from '@angular/core';
import {BrowserStorageService} from '../browser-storage.service';
import {Cache} from './cache-data.type';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly storage = inject(BrowserStorageService);

  private readonly validity: number = environment.cache.validity;

  match<T, U = T>(key: string, fetch: () => Observable<U>, transformCache?: (cached: T) => U): Observable<U> {
    const cached: Cache<T> | undefined = this.storage.get<Cache<T>>(key);

    if (cached === undefined) {
      return fetch().pipe(tap(value => this.save(key, value)));
    }

    if (cached.timestamp + this.validity > new Date().getTime()) {
      return of(transformCache !== undefined ? transformCache(cached.data) : cached.data as unknown as U);
    }

    return fetch().pipe(tap(value => this.save(key, value)));
  }

  private save<T>(key: string, value: T) {
    const cache: Cache<T> = {
      timestamp: new Date().getTime(),
      data: value
    }
    this.storage.set<Cache<T>>(key, cache);
  }
}
