import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '../shared/models/categories';
import { ShopParams } from '../shared/models/shopParams';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm:any; ElementRef: any;
  products: Product[] = [];
  categories: Category[] = [];
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Price : Low to High', value: 'priceAsc' },
    { name: 'Price : High to Low', value: 'priceDesc' },
  ];

  totalCount =0;

  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getCategories() {
    this.shopService.getCategories().subscribe({
      next: (response) =>
        (this.categories = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }


  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products= response.data;
        this.shopParams.pageIndex =response.pageIndex;
        this.shopParams.pageSize=response.pageSize;
        this.totalCount =response.count;
      }
      ,
      error : error => console.log(error)

    })
  }

  onCategorySelected(categoryId: number) {
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageIndex=1;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.shopParams.sort= event.target.value;
    this.getProducts();
  }

  onPageChanged(event:any){
    if(this.shopParams.pageIndex !== event){
       this.shopParams.pageIndex = event;
       this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value
    this.shopParams.pageIndex=1
    this.getProducts();

  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value="";
    this.shopParams = new ShopParams();
  }
}
