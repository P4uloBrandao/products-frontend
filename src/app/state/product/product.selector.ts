import {AppState} from "../app.state";

export const productSelector = (appState: AppState) =>
  appState.products.products;

export const productStatusSelector = (appState: AppState) =>
  appState.products.status;
