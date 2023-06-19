import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Order, OrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  createOrder(order: OrderToCreate){
    return this.http.post<Order>(this.baseUrl+'order',order);
  }

  

}
