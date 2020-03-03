import { Injectable } from '@angular/core';
import { filterNil, ID, QueryEntity } from '@datorama/akita';
import { ProductsStore, ProductsState } from './product.store';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })

export class ProductsQuery extends QueryEntity<ProductsState, Product> {
  selectFilters$ = this.select('filters');
  selectSearchTerm$ = this.select('searchTerm');

  get filters() {
    return this.getValue().filters;
  }

  get searchTerm() {
    return this.getValue().searchTerm;
  }

  constructor(protected store: ProductsStore) {
    super(store);
  }

  selectProduct(id: ID) {
    return this.selectEntity(id).pipe(filterNil, filter(({ additionalData }) => !!additionalData ));
  }
}