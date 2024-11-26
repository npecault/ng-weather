import {Component, inject, Signal} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {LocationService} from '../../services/location.service';
import {Router, RouterLink} from '@angular/router';
import {ConditionsAndZip} from '../../model/conditions-and-zip.type';
import {CommonModule, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  imports: [
    DecimalPipe,
    RouterLink,
    CommonModule
  ],
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  protected weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.currentConditions;

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }
}
