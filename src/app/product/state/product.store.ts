import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Product } from './product.model';

export interface ProductsState extends EntityState<Product> {
  searchTerm: string;
  filters: {
    price: number;
    name: string;
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'products' })
export class ProductsStore extends EntityStore<ProductsState, Product> {

  constructor() {
    super({
      searchTerm: '',
      filters: {
        price: null,
        name: null
      }
    });
  }

}