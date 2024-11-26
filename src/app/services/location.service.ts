import {effect, Injectable, signal, Signal, WritableSignal} from '@angular/core';

export const LOCATIONS = 'locations';

@Injectable({providedIn: 'root'})
export class LocationService {

  private readonly _locations: WritableSignal<string[]> = signal([]);
  /**
   * Signal updated whenever a location has been added or removed.
   */
  readonly locations: Signal<string[]> = this._locations.asReadonly();

  constructor() {
    const locString = localStorage.getItem(LOCATIONS);
    if (locString) {
      const locations: string[] = JSON.parse(locString);
      this._locations.set(locations);
    }

    effect(() => {
      const locationsString = JSON.stringify(this.locations());
      localStorage.setItem(LOCATIONS, locationsString);
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
