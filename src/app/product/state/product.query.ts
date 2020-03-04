
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProductsStore, ProductsState } from './product.store';
import { Product } from './product.model';

// @QueryConfig({
//   sortBy: 'name',
//   sortByOrder: Order.ASC // Order.DESC
// })

@Injectable({ providedIn: 'root' })

export class ProductsQuery extends QueryEntity<ProductsState, Product> {

  selectFilters = this.select('filters');
  selectSearchTerm = this.select('searchTerm');

  get filters() {
    return this.getValue().filters;
  }

  get searchTerm() {
    return this.getValue().searchTerm;
  }

  constructor(protected store: ProductsStore) {
    super(store);
  }

}