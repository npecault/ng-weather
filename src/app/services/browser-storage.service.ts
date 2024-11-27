import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  set<T>(key: string, value: T): T {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  get<T>(key: string): T | undefined {
    const value = localStorage.getItem(key);
    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error(error);
      }
    }
  }

  update<T>(key: string, mutator: (old: T | undefined) => T): T {
    const current = this.get<T>(key);
    return this.set<T>(key, mutator(current));
  }
}
