import { Component, OnInit } from '@angular/core';
import { CartQuery } from './state/cart.query';
import { ID } from '@datorama/akita';
import { CartService } from './state/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products = this.cartQuery.selectAll();
  productTotal = this.cartQuery.itemTotal;
  cartTotal = this.cartQuery.priceTotal;

  showCart:boolean = false;

  constructor(
    private cartQuery: CartQuery,
    private cartService: CartService
  ) { }

  ngOnInit(){
    this.cartService.getCart();
  }

  remove(productId: ID) {
    this.cartService.removeProduct(productId);
  }

  toggleCartDialogue(){
    this.showCart = !this.showCart;
  }

  checkout() {
    //checkout
  }

}
