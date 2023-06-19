import * as cuid from "cuid"

    export interface BasketItem {
    id: number
    productName: string
    price: number
    quantity: number
    imageUrl: string
    category: string
    description: string
  }

  export interface  Basket{
    id: string
    items: BasketItem[]
  }
  
  export class Basket implements Basket {
    id=cuid();
    items: BasketItem[]=[];
  }

  export interface BasketTotals{
    discount : number;
    subtotal : number;
    total : number;
  }