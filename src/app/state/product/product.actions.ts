import {createAction, props} from "@ngrx/store";
import {ProductModel} from "../../models/products.models";

const getProducts = createAction(
  '[Product] Get Products'
);
const getProductsSuccess = createAction(
  '[Product] Get Products Success',
  props<{products: ProductModel[]}>()
);

const addProducts = createAction(
  '[Product] Add Products',
  props<{product: ProductModel}>()
);
const addProductsSuccess = createAction(
  '[Product] Add Products Success',
);

const deleteProducts = createAction(
  '[Product] Delete Products',
  props<{idProduct: string}>()
);
const deleteProductsSuccess = createAction(
  '[Product] Delete Products Success',
  props<{idProduct: string}>()
);

export const productActions = {
  getProducts,
  getProductsSuccess,
  addProduct: addProducts,
  addProductSuccess: addProductsSuccess,
  deleteProduct: deleteProducts,
  deleteProductSuccess: deleteProductsSuccess
}
