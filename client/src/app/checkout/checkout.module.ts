import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { BasketService } from '../basket/basket.service';
import { CheckoutService } from './checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from '../shared/models/basket';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,CheckoutRoutingModule
  ]
})
export class CheckoutModule { 

  constructor(private basketService:BasketService,private checkoutService:CheckoutService,
    private toastr:ToastrService)
  {

  }

  // submitOrder(){
  //   const basket = this.basketService.getCurrentBasketValue();
  //   if(!basket) return ;

  //   const orderToCreate = this.getOrderToCreate(basket);

  //   if(!orderToCreate) return;

  //   this.checkoutService.createOrder(orderToCreate).subscribe({

  //     next : (order) =>{
  //       this.toastr.success('Order created Succesfully');
  //       console.log(order);

  //     }
  //   })


  // }

  // private getOrderToCreate(basket: Basket) {
  //   return {
  //     basketId:basket.id,
  //   }
  // }
}
