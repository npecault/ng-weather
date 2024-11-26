import {Component, inject, Signal} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {LocationService} from "../../services/location.service";
import {Router} from "@angular/router";
import {ConditionsAndZip} from '../../model/conditions-and-zip.type';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css'],
    standalone: false
})
export class CurrentConditionsComponent {

  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }
}
