export interface Order {
  
    buyerEmail: string
    orderDate: string
    orderItems: OrderItem[]
    subTotal: number
    id: number
  }
  
  export interface OrderItem {
    productName: string
    price: number
    discount:number
    quantity: number
    id: number
    productId: number
    imageUrl: string
  }
  
  export interface OrderToCreate {
    basketId : string
  }
  