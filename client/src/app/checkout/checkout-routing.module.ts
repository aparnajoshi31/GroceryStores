import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutModule } from './checkout.module';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes =[
  {path:'',component: CheckoutComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class CheckoutRoutingModule { }
