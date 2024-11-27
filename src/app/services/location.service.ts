import {effect, inject, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {BrowserStorageService} from './browser-storage.service';

export const LOCATIONS = 'locations';

@Injectable({providedIn: 'root'})
export class LocationService {
  private readonly storage = inject(BrowserStorageService);

  private readonly _locations: WritableSignal<string[]> = signal([]);
  /**
   * Signal updated whenever a location has been added or removed.
   */
  readonly locations: Signal<string[]> = this._locations.asReadonly();

  constructor() {
    const storedLocations = this.storage.get<string[]>(LOCATIONS);

    if (storedLocations !== undefined) {
      this._locations.set(storedLocations);
    }

    effect(() => {
      this.storage.set(LOCATIONS, this.locations());
    });
  }

  addLocation(zipcode: string) {
    this._locations.update((current) => [...current, zipcode]);
  }

  removeLocation(zipcode: string) {
    const index = this.locations().indexOf(zipcode);
    if (index !== -1) {
      this._locations.update(current => {
        const result = [...current];
        result.splice(index, 1)
        return result;
      });
    }
  }
}
