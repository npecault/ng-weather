import {Component} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Forecast} from './forecast.type';
import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  imports: [
    CommonModule,
    RouterLink,
    DecimalPipe,
    DatePipe
  ],
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

  zipcode!: string;
  forecast!: Forecast;

  constructor(protected weatherService: WeatherService, route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      weatherService.getForecast(this.zipcode)
        .subscribe(data => this.forecast = data);
    });
  }
}
