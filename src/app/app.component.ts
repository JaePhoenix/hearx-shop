import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product/state/product.model';
import { ProductsService } from './product/state/product.service';
import { ProductsQuery } from './product/state/product.query';

import { untilDestroyed } from 'ngx-take-until-destroyed';
import { fromEvent } from 'rxjs';
import { snapshotManager } from '@datorama/akita';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'hearx-shop';

  isLoading: boolean;
  products: Product;

  constructor(
    private productService: ProductsService,
    private productsQuery: ProductsQuery
  ){ }

  ngOnInit(){

    this.isLoading = true;

    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
        this.isLoading = false;
      }
    )

    fromEvent<StorageEvent>(window, 'storage').pipe(
      filter(event => event.key === 'hearx-cart')
      // untilDestroyed(this)
    ).subscribe(event => {
      snapshotManager.setStoresSnapshot(event.newValue, { skipStorageUpdate: true });
    });

  }

}
