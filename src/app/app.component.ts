import { Order } from '@datorama/akita';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, EMPTY } from 'rxjs';
import { Product } from './product/state/product.model';
import { ProductsService } from './product/state/product.service';
import { ProductsQuery } from './product/state/product.query';
import { switchMap } from 'rxjs/operators';

import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'hearx-shop';

  isLoading: Observable<boolean>;;
  products: Observable<Product[]>;;

  constructor(
    private productService: ProductsService,
    private productsQuery: ProductsQuery
  ){ }

  ngOnInit(){

    this.isLoading = this.productsQuery.selectLoading();
    this.products = this.productsQuery.selectAll();

    combineLatest([
      this.productsQuery.selectHasCache(),
      this.productsQuery.selectFilters,
      this.productsQuery.selectSearchTerm,
    ]).pipe(switchMap(([cached, filters, searchTerm]) => {
      return cached ? EMPTY : this.productService.getAllProducts(searchTerm, filters);
    }), untilDestroyed(this)).subscribe({
      error(err) {
        console.log(err)
      }
    });

    // fromEvent<StorageEvent>(window, 'storage').pipe(
    //   filter(event => event.key === 'hearx-cart')
    //   // untilDestroyed(this)
    // ).subscribe(event => {
    //   snapshotManager.setStoresSnapshot(event.newValue, { skipStorageUpdate: true });
    // });

  }

  ngOnDestroy() {
  }

}
