import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService, Result } from '../core';
import { filter, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private custom = this.config.url.custom;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {

  }

  /**
   * 产品
   */
  public getLocalCateWithSupplier(params: {}) {
    const json = sessionStorage.getItem('zc_local_supplier_products');
    if (json) {
      return of(JSON.parse(json));
    }
    return this.http.get(`${this.custom}products?supplier`, { params: params })
      .pipe(
        filter((v: Result<any>) => v.errCode === 0),
        map((v: Result<any>) => v.content.content),
        tap(v => sessionStorage.setItem('zc_local_supplier_products', JSON.stringify(v)))
      );
  }

}
