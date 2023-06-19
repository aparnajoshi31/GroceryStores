import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { Order, OrderToCreate } from '../shared/models/order';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket| null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals| null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http:HttpClient) { 

  }

  createOrder(order: OrderToCreate){
     return this.http.post<Order>(this.baseUrl+'order',order);
  }

  getBasket(id:string){
    return this.http.get<Basket>(this.baseUrl+'basket?id='+id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    });
  }

  setBasket(basket: Basket){
       return this.http.post<Basket>(this.baseUrl +'basket',basket).subscribe({
        next : basket => {
          this.basketSource.next(basket);
          this.calculateTotals();
        }
       })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item:Product| BasketItem,quantity = 1){
   
    
    if(this.isProduct(item)) item = this.mapProuductItemtoBasketItem(item);

    const basket = this.getCurrentBasketValue() ?? this.createBasket();

    basket.items =this.addOrUpdateItem(basket.items,item,quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(id: number,quantity =1){
    const basket = this.getCurrentBasketValue();
    if(!basket){
      return;
    }
    const item = basket.items.find(x=>x.id === id);

    if(item){
      item.quantity -= quantity;
      if(item.quantity ===0){
        basket.items = basket.items.filter(x=>x.id !==id);
      }

      if(basket.items.length >0) this.setBasket(basket);

      else this.deleteBasket(basket);
    }
  }


  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl+ 'basket?id='+ basket.id).subscribe({
      next : () =>{
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      }
    })
  }

  private addOrUpdateItem(items: BasketItem[],itemtoAdd:BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x=>x.id === itemtoAdd.id);
    if(item) item.quantity += quantity;
    else{
      itemtoAdd.quantity = quantity;
      items.push(itemtoAdd);
    }

    return items;
  }
  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }

  private mapProuductItemtoBasketItem(item:Product):BasketItem{
    return{
      id:item.id,
      productName:item.name,
      price:item.price,
      quantity:0,
      imageUrl:item.imageUrl,
      category:item.productCategory,
      description:item.description,
     
    }
  }

  private calculateTotals(){
    const basket=this.getCurrentBasketValue();
    if(!basket) return;
    const discount=0;
    const subtotal = basket.items.reduce((a,b)=>(b.price * b.quantity)+a,0);

    const total = subtotal+discount;
    this.basketTotalSource.next({discount,total,subtotal});
  }

  private isProduct(item:Product | BasketItem) : item is Product{
    return (item as Product).productCategory !== undefined;
  }


}
