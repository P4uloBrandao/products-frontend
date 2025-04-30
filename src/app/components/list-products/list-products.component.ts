import {Component, inject, OnInit} from '@angular/core';
import {User, UserRole} from "../../models/user.models";
import {AuthService} from "../../services/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {productActions} from "../../state/product/product.actions";
import {productSelector, productStatusSelector} from "../../state/product/product.selector";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {ProductState, ProductStatus} from "../../state/product/product.reducer";
import {ProductModel} from "../../models/products.models";
import {ConfirmationModalComponent} from "../shared/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    MatButton,
    AsyncPipe
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit{
  private authService = inject(AuthService);
  readonly dialog = inject(MatDialog);
  private router = inject(Router);
  private store = inject(Store);

  protected readonly UserRole = UserRole;

  public productsList : Observable<ProductModel[]>= this.store.select(productSelector);
  public productListStatus: Observable<ProductStatus> = this.store.select(productStatusSelector);

  public user?: User;

  ngOnInit(){

    this.user = this.authService.getAuth();

    this.store.dispatch(productActions.getProducts());
  }

  deleteProduct(idProduct: string): void {
    let dialog = this.dialog.open(ConfirmationModalComponent, {
      width: '250px'
    });

    dialog.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(productActions.deleteProduct({idProduct}));
      }
    });
  }

  editProduct(idProduct: string): void {
    //go to product and add id parameter
    this.router.navigate(['/product', idProduct]);
  }


}
