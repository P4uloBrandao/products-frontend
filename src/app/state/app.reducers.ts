import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "./app.state";
import {productActions} from "./product/product.actions";
import {productReducer} from "./product/product.reducer";

export const appReducers: ActionReducerMap<AppState> = {
  products: productReducer
};
