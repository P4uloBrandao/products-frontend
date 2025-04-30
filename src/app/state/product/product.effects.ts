import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {ProductsService} from "../../services/products/products.service";
import {productActions} from "./product.actions";
import {catchError, map, switchMap} from "rxjs";


export const getProductsEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$
      .pipe(
        ofType(productActions.getProducts),
        switchMap(
          () => productService.getProducts()
            .pipe(
              map(
                products => productActions.getProductsSuccess({products})
              )
            )
        )
      )
  }, {functional: true}
)

export const deleteProductsEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$
      .pipe(
        ofType(productActions.deleteProduct),
        switchMap(
          (idProduct) => productService.deleteProduct(idProduct.idProduct)
            .pipe(
              map(
                idProduct => productActions.deleteProductSuccess(idProduct.idProduct)
              )
            )
        )
      )
  }, {functional: true}
)


export const effectProvider = {
  getProducts: getProductsEffect,
  deleteProduct: deleteProductsEffect
}


