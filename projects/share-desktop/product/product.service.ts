import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConfigService, Result } from '../core/service/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _headers = new HttpHeaders()
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('X-Requested-With', 'XMLHttpRequest');

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
    return this.http.get(`${this.custom}products?supplier`, { headers: this._headers, params: params })
      .pipe(
        filter((v: Result<any>) => v.errCode === 0),
        map((v: Result<any>) => v.content.content),
        tap(v => sessionStorage.setItem('zc_local_supplier_products', JSON.stringify(v)))
      );
  }

}
