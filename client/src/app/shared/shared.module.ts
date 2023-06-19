import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagerComponent } from './pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './component/text-input/text-input.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
   
  
    PagerComponent,
     OrderTotalsComponent,
     TextInputComponent
  ],
  imports: [
    CommonModule,NgbPaginationModule,ReactiveFormsModule,BsDropdownModule.forRoot(),PaginationModule.forRoot()
  ],
  exports:[
    NgbPaginationModule,
    PagerComponent,
    NgbCarouselModule,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,BsDropdownModule,TextInputComponent,PaginationModule
  ]
})
export class SharedModule { }
