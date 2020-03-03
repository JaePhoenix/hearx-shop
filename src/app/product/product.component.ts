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

  addToCart(product: Product) {
    if(this.productInCart(product.id)){
      this.cartService.addProduct(product, this.cartQuery.getProduct(product.id)['quantity'] + 1)
    } else {
      this.cartService.addProduct(product, 1);
    }
  }

  editCart(product: Product, quantity: number){
    if(quantity <= 0){
      this.cartService.removeProduct(product.id)
    } else {
      this.cartService.addProduct(product, quantity);
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
