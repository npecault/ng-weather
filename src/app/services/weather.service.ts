import {inject, Injectable, Signal} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {CurrentConditions} from '../features/current-conditions/current-conditions.type';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';
import {Forecast} from '../features/forecasts-list/forecast.type';
import {environment} from '../../environments/environment';
import {LocationService} from './location.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class WeatherService {
  private readonly url = environment.weather_api.url;
  private readonly appid = environment.weather_api.appid;
  private readonly icon_url = environment.weather_api.icon_url;

  private readonly http = inject(HttpClient);
  private readonly locationService = inject(LocationService);

  readonly currentConditions: Signal<ConditionsAndZip[]> =
    toSignal(
      toObservable(this.locationService.locations).pipe(
        switchMap(locations =>
          locations.length > 0 ?
            this.mapLocationsToConditions(locations)
            : of([])
        )
      ), {initialValue: []}
    )

  getCurrentConditionsZip(zipcode: string): Observable<CurrentConditions> {
    return this.http.get<CurrentConditions>(`${this.url}/weather?zip=${zipcode},us&units=imperial&APPID=${this.appid}`);
  }

  getForecast(zipcode: string): Observable<Forecast> {
    return this.http.get<Forecast>(`${this.url}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${this.appid}`);
  }

  getWeatherIcon(id: number): string {
    if (id >= 200 && id <= 232) {
      return this.icon_url + 'art_storm.png';
    } else if (id >= 501 && id <= 511) {
      return this.icon_url + 'art_rain.png';
    } else if (id === 500 || (id >= 520 && id <= 531)) {
      return this.icon_url + 'art_light_rain.png';
    } else if (id >= 600 && id <= 622) {
      return this.icon_url + 'art_snow.png';
    } else if (id >= 801 && id <= 804) {
      return this.icon_url + 'art_clouds.png';
    } else if (id === 741 || id === 761) {
      return this.icon_url + 'art_fog.png';
    } else {
      return this.icon_url + 'art_clear.png';
    }
  }

  private mapLocationsToConditions(locations: string[]): Observable<ConditionsAndZip[]> {
    return forkJoin(
      locations.map(zip => this.getCurrentConditionsZip(zip).pipe(
        map(data => ({zip: zip, data: data})),
        catchError(() => of(null))
      ))
    ).pipe(
      map(locations => locations.filter(l => l !== null))
    )
  }
}
