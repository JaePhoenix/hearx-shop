import { Injectable } from '@angular/core';
import { CartStore } from './cart.store';
import { ID } from '@datorama/akita';
import { Product } from './../../product/state/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(
    private cartStore: CartStore
  ) { }

  addProduct(product: Product, quantity: number) {
    this.cartStore.upsert(product.id, {
      name: product.name,
      price: product.price,
      total: product.price * quantity,
      quantity
    });
  }

  removeProduct(productId: ID) {
    this.cartStore.remove(productId);
  }

  saveCart(){
    const now = new Date();

    const cartContent = {
      value: this.cartStore,
      expiry: now.getTime() + 1000 * 60 * 60 // one hour
    }

    console.log('saving cart => ', this.cartStore)

    localStorage.setItem('hearx-cart', JSON.stringify(cartContent))
  }

  getCart(){
    const cartContentString = localStorage.getItem('hearx-cart');

    if (!cartContentString) return null

    const cartContent = JSON.parse(cartContentString);
    const now = new Date();

    // remove item from storage if it expired
    if (now.getTime() > cartContent.expiry) {
      localStorage.removeItem(cartContentString)
      return null
    }

    console.log('cart -> ', cartContent.value)

    return cartContent.value
  }

}