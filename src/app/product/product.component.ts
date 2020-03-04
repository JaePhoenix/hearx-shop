import { CartQuery } from './../cart/state/cart.query';
import { Component, Input } from '@angular/core';
import { Product } from './state/product.model';
import { CartService } from './../cart/state/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product:Product;

  constructor(
    private cartService: CartService,
    private cartQuery: CartQuery
  ){}

  productInCart(productId){
    return this.cartQuery.hasProduct(productId);
  }

  addToCart(product: Product, quantity?: number) {

    let qty = quantity ? quantity : 1;

    if(this.productInCart(product.id)){
      this.cartService.addProduct(product, this.cartQuery.getProduct(product.id)['quantity'] + qty)
    } else {
      this.cartService.addProduct(product, qty);
    }
  }

  removeFromCart(product: Product) {

    let productQty = this.cartQuery.getProduct(product.id)['quantity'];

    this.cartService.addProduct(product,  productQty - 1);

    if(productQty <= 1){
      this.cartService.removeProduct(product.id)
    }
  }
  
}
