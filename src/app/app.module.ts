import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { fakeServerProvider } from './_fakeServer/fakeServerProvider';
import { FiltersComponent } from './filters/filters.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    fakeServerProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
