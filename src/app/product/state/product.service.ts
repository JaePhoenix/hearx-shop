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
    private productsStore: ProductsStore,
    private http: HttpClient
   ) {
  }

  getAllProducts(term:string, filters) {
    return this.http.get<Product[]>('/products', { 
      params: { term, ...filters }
    }).pipe(
      tap(products => this.productsStore.set(products))
    )
  }

  updateFilters(filters) {
    this.productsStore.update({ filters });
  }

  invalidateCache() {
    this.productsStore.setHasCache(false);
  }

  updateSearchTerm(searchTerm: string){
    this.productsStore.update({ searchTerm });
    this.invalidateCache();
  }

}