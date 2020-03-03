import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ProductsStore } from './product.store';
import { Product } from './product.model';
import { tap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor(
    private http: HttpClient
   ) {
  }

  getAllProducts() {
    return this.http.get<Product>('/products');
  }
}