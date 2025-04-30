import {ProductModel} from "../../models/products.models";
import {createReducer, on} from "@ngrx/store";
import {productActions} from "./product.actions";

export interface ProductState {
  products: ProductModel[];
  error: string | null;
  status: ProductStatus;
}

export enum ProductStatus {
  loading = 'loading',
  pending = 'pending',
  success = 'success',
  error = 'error'
}

const initialState: ProductState = {
  error: null,
  status: ProductStatus.pending,
  products: []
}

export const productReducer = createReducer(
  initialState,
  //GET
  on(productActions.getProducts, (currentState) => {
    return {
      ...currentState,
      status: ProductStatus.loading
    }
  }),
  on(productActions.getProductsSuccess, (currentState, {products}) => {
    return {
      ...currentState,
      products,
      status: ProductStatus.success
    }
  }),
  //End GET

  //ADD
  on(productActions.addProduct, (currentState, {product}) => {
    return {
      ...currentState,
      status: ProductStatus.loading
    }
  }),
  on(productActions.addProductSuccess, (currentState) => {
    return {
      ...currentState,
      status: ProductStatus.success
    }
  }),
  //End ADD

  //DELETE
  on(productActions.deleteProduct, (currentState, {idProduct}) => {
    return {
      ...currentState,
      status: ProductStatus.loading
    }
  }),
  on(productActions.deleteProductSuccess, (currentState, {idProduct}) => {
    const products = currentState.products.filter(product => product.idProduct !== idProduct);
    console.log(products, idProduct);
    return {
      ...currentState,
      products,
      status: ProductStatus.success
    }
  })
  //End DELETE
)
