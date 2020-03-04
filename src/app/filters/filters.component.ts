import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsQuery } from '../product/state/product.query';
import { ProductsService } from '../product/state/product.service';

import { untilDestroyed } from 'ngx-take-until-destroy';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  filters = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
  });

  constructor(
    private productsService: ProductsService,
    private productsQuery: ProductsQuery
  )
  { }

  ngOnInit(): void {
    this.filters.patchValue(this.productsQuery.filters);
    this.filters.valueChanges.pipe(
      tap(() => this.productsService.invalidateCache()),
      untilDestroyed(this)
    ).subscribe(filters => this.productsService.updateFilters(filters))
  }

  ngOnDestroy() {}

}
