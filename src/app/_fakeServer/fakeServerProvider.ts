import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import  *  as  productList  from  './products.json';

const products = productList['default'] || [];

@Injectable()
export class FakeServerInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(1000))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/products') && method === 'GET':
                    return getAllProducts();
                default:
                    return next.handle(request);
            }
        }

        function getAllProducts() {
            return of(new HttpResponse({ status: 200, body: products }))
        }
    }
}

export const fakeServerProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeServerInterceptor,
    multi: true
};