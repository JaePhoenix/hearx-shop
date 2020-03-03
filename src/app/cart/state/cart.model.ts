import { ID } from '@datorama/akita';
import { Product } from './../../product/state/product.model';

export interface CartItem {
  productId: ID;
  quantity: number;
  name: Product['name'];
  price: Product['price'];
  total: number;
}