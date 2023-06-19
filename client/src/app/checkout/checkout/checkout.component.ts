import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  clicked = false;
  constructor(private basketService:BasketService,private checkoutService:CheckoutService,
    private toastr:ToastrService)
  {

  }

  submitOrder(){
    const basket = this.basketService.getCurrentBasketValue();
    if(!basket) return ;

    const orderToCreate = this.getOrderToCreate(basket);

    if(!orderToCreate) return;

    this.checkoutService.createOrder(orderToCreate).subscribe({

      next : (order) =>{
        this.toastr.success('Order created Succesfully');
        console.log(order);

      }
    })


  }

  private getOrderToCreate(basket: Basket) {
    return {
      basketId:basket.id,
    }
  }
}
