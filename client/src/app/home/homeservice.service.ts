import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { AccountService } from '../account/account.service';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {

  baseUrl = environment.apiUrl;
  constructor(public accountService:AccountService,private http:HttpClient) { }


  createProduct(product: Product){
    return this.http.post<Product>(this.baseUrl+'products',product);

  }

  editProduct(product : Product,id:any){
    return this.http.put<Product>(this.baseUrl+'products/'+id,product);
  }


  getProductsById(id:any){
    return this.http.get<Product>(this.baseUrl+'products/'+id);
  }

  deleteProduct(id:any){
    return this.http.delete<Product>(this.baseUrl+'products/'+id);
  }




}
