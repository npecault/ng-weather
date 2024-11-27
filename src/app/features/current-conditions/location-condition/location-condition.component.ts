import {Component, computed, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {ConditionsAndZip} from '../../../model/conditions-and-zip.type';
import {WeatherService} from '../../../services/weather.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-location-condition',
  imports: [
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './location-condition.component.html',
  styleUrl: './location-condition.component.css'
})
export class LocationConditionComponent {
  private readonly weatherService = inject(WeatherService);

  location: InputSignal<ConditionsAndZip> = input.required();
  clickCard: OutputEmitterRef<void> = output();
  removeLocation: OutputEmitterRef<void> = output();

  protected readonly icon = computed(() => this.weatherService.getWeatherIcon(this.location().data.weather[0].id));
}
