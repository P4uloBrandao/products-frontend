import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideStore} from "@ngrx/store";
import {appReducers} from "./state/app.reducers";
import {provideEffects} from "@ngrx/effects";
import {effectProvider, getProductsEffect} from "./state/product/product.effects";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore(appReducers),
    provideEffects(effectProvider)
  ]
};
