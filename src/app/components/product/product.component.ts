import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductDto, ProductModel} from "../../models/products.models";
import {ProductsService} from "../../services/products/products.service";

@Component({
  selector: 'app-product',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public product?:ProductModel;

  public productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    value: [0,[ Validators.required, Validators.maxLength(20)]],
  });

  ngOnInit() {

    let idProduct = this.route.snapshot.paramMap.get('idProduct');

    if (!!idProduct) {
      this.productService.getProduct(idProduct).subscribe(
        {
          next: value => {
            this.product = value;
            this.productForm.patchValue(this.product);
          },
          error: error => console.error(error)
        }
      );
    }
  }

  preventNegative(event: any) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData: ProductDto = {
        name: this.productForm.value.name ?? '',
        value: this.productForm.value.value ?? 0
      };

      if(this.product){
        this.productService.updateProduct(this.product.idProduct, productData).subscribe(
          () => {
            this.router.navigate(['/products']);
          }
        );
      } else {
        this.productService.createProduct(productData).subscribe(
          () => {
            this.router.navigate(['/products']);
          }
        );
      }
    }
  }

}
