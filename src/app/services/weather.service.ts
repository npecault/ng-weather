import {Injectable, Signal, signal} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {CurrentConditions} from '../features/current-conditions/current-conditions.type';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';
import {Forecast} from '../features/forecasts-list/forecast.type';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class WeatherService {

  private readonly url = environment.weather_api.url;
  private readonly appid = environment.weather_api.appid;
  private readonly icon_url = environment.weather_api.icon_url;

  private currentConditions = signal<ConditionsAndZip[]>([]);

  constructor(private http: HttpClient) { }

  addCurrentConditions(zipcode: string): void {
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    this.http.get<CurrentConditions>(`${this.url}/weather?zip=${zipcode},us&units=imperial&APPID=${this.appid}`)
      .subscribe(data => this.currentConditions.update(conditions => [...conditions, {zip: zipcode, data}]));
  }

  removeCurrentConditions(zipcode: string) {
    this.currentConditions.update(conditions => {
      for (const i in conditions) {
        if (conditions[i].zip == zipcode)
          conditions.splice(+i, 1);
      }
      return conditions;
    })
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Forecast>(`${this.url}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${this.appid}`);
  }

  getWeatherIcon(id: number): string {
    if (id >= 200 && id <= 232)
      return this.icon_url + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return this.icon_url + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return this.icon_url + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return this.icon_url + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return this.icon_url + "art_clouds.png";
    else if (id === 741 || id === 761)
      return this.icon_url + "art_fog.png";
    else
      return this.icon_url + "art_clear.png";
  }

}
