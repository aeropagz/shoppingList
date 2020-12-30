import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

import { Product } from "../_models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrlProducts = "http://localhost:8080/products";
  private apiUrlProductsFarmer = "http://localhost:8080/farmer/products";

  constructor(private http: HttpClient) { }

  createProduct(product: Product){
    return this.http.post(this.apiUrlProducts , product);
  }

  getProductByFarmers(){
    return this.http.get(this.apiUrlProductsFarmer);
  }
}
