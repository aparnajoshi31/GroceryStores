import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Category } from '../shared/models/categories';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:7100/api/';

  constructor(private http: HttpClient) {}

  getProducts(shopParams:ShopParams) {
    let params = new HttpParams();
  
    if (shopParams.categoryId > 0 ) params = params.append('categoryID', shopParams.categoryId);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageIndex);
    params = params.append('pageSize', shopParams.pageSize);
    if (shopParams.search) params = params.append('search', shopParams.search);
    


    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {
      params
    });
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'products/categories');
  }

  getProduct(id:number){
    return this.http.get<Product>(this.baseUrl + 'products/'+ id);
  }

  
}
