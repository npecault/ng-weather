import {enableProdMode, importProvidersFrom} from '@angular/core';
import {environment} from './environments/environment';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {FormsModule} from '@angular/forms';
import {provideRouter} from '@angular/router';
import {WeatherRoutes} from './app/app.routing';
import {ServiceWorkerModule} from '@angular/service-worker';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptorsFromDi()), provideRouter(WeatherRoutes), importProvidersFrom(
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  )]
}).catch(e => console.error(e));
