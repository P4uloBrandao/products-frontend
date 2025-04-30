import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {ProductDto, ProductModel} from "../../models/products.models";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private apiurl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getProducts() : Observable<ProductModel[]> {

    const token = this.authService.getAuth()?.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    const url = `${this.apiurl}/products`;

    return this.http.get<ProductModel[]>(url, httpOptions);
  }

  public getProduct(idProduct: string) : Observable<ProductModel> {

    const token = this.authService.getAuth()?.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    const url = `${this.apiurl}/products/${idProduct}`;

    return this.http.get<ProductModel>(url, httpOptions);
  }

  public deleteProduct(idProduct: string) : Observable<any> {

    const token = this.authService.getAuth()?.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    const url = `${this.apiurl}/products/${idProduct}`;

    return this.http.delete<any>(url, httpOptions);
  }

  public updateProduct(idProduct: string, productDto: ProductDto) : Observable<any> {

    const token = this.authService.getAuth()?.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    const url = `${this.apiurl}/products/${idProduct}`;

    return this.http.put<any>(url, productDto, httpOptions);
  }

  public createProduct(productDto: ProductDto) : Observable<any> {

    const token = this.authService.getAuth()?.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    const url = `${this.apiurl}/products`;

    return this.http.post<any>(url, productDto, httpOptions);
  }


}
