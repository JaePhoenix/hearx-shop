import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { CartState, CartStore } from './cart.store';
import { CartItem } from './cart.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartQuery extends QueryEntity<CartState, CartItem> {

  priceTotal = this.selectAll().pipe(
    map(items => items.reduce((acc, item) => acc + item.total, 0))
  );

  itemTotal = this.selectAll().pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  constructor(
    protected store: CartStore
  ) {
    super(store);
  }

  hasProduct(id: ID) {
    return this.hasEntity(id)
  }

  getProduct(id: ID){

    let product = {};

    this.selectAll({
      filterBy: entity => entity.productId === id
    }).subscribe(res => { product = res[0] });

    return product;
  }

}