import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity =1;
  quantityinBasket=0;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,private basketService:BasketService
  ) {

    this.bcService.set('@productDetails','');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
     const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
          this.basketService.basketSource$.pipe(take(1)).subscribe({
            next: basket => {
              const item = basket?.items.find(x=>x.id===+id);
              if(item){
                this.quantity = item.quantity;
                this.quantityinBasket=item.quantity;
              }
            }
          })
        },
        error: (error) => console.log(error),
      });
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    this.quantity--;
  }

  updateBasket(){
    if(this.product){
      if(this.quantity > this.quantityinBasket){
        const itemsToAdd = this.quantity -this.quantityinBasket;
        this.quantityinBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product,itemsToAdd);
      }
      else{
        const itemToRemove = this.quantityinBasket - this.quantity;
        this.quantityinBasket -= itemToRemove;
        this.basketService.removeItemFromBasket(this.product.id,itemToRemove);
      }
    }
  }

  get buttonText(){
    return this.quantityinBasket ===0 ? 'Add to Basket' : 'Update Basket';
  }

 
}
