import { Component, Input } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { HomeserviceService } from '../homeservice.service';
import { ShopService } from 'src/app/shop/shop.service';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { Product } from 'src/app/shared/models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
// interface Product {
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   productCategoryId: number;
//    productCategory: string
//   availableQuantity: number;
//   discount: number;
//   specification: string;
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //@Input() result:any
  @Input() id: any;
  productForm!: FormGroup;
  isModalOpen = true;
  productById!: Product;
  closeResult = '';
  products: Product[] = [];
  shopParams = new ShopParams();

  baseUrl = environment.apiUrl;

  constructor(
    public basketService: BasketService,
    public accountService: AccountService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private homeService: HomeserviceService,
    private shopService: ShopService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.initProductForm();
    this.showProducts();
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private initProductForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required],
      productCategoryId: ['', Validators.required],
      availableQuantity: ['', Validators.required],
      discount: ['', Validators.required],
      specification: ['', Validators.required],
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.modalService.dismissAll('save content');
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.homeService.createProduct(this.productForm.value).subscribe(
        (response) => {
          // Handle the success response from the API
          console.log(response);
          window.alert('Product added successfully');
          this.closeModal();
        },
        (error) => {
          // Handle the error response from the API
          console.error(error);
          window.alert('Failed to add product');
        }
      );
    } else {
      // Form is invalid, handle accordingly (e.g., display error messages)
      window.alert('Invalid form data');
    }
  }

  onEdit(id: any) {
    if (this.productForm) {
      console.log(this.id);
      this.homeService.editProduct(this.productForm.value, this.id).subscribe(
        (response) => {
          // Handle the success response from the API
          console.log(response);
          window.alert('Product updated successfully');
          this.closeModal();
        },
        (error) => {
          // Handle the error response from the API
          console.error(error);
          window.alert('Failed to add product');
        }
      );
    } else {
      // Form is invalid, handle accordingly (e.g., display error messages)
      window.alert('Invalid form data');
    }
  }

  showProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (error) => console.log(error),
    });
  }

   onUpdate(id: any, contentUpdate: any) {
    setTimeout(() => {
      
    }, 1000);
     this.homeService.getProductsById(id).subscribe({
      next: (response) => {
        console.log(response);

        this.productById = response;
        console.log(this.productById);
        // this.id = id;
        // console.log(id);
        // // console.log(result);

        // const modalRef = this.modalService.open(contentUpdate);
        // modalRef.componentInstance.id = id;
      },
      error: (error) => console.log(error),
    });
    

    const result = this.http.get<Product>(this.baseUrl + `products/${id}`);
    this.id=id;
    console.log(id);
    console.log(result);

    const modalRef = this.modalService.open(contentUpdate);
    modalRef.componentInstance.id = id;
    //modalRef.componentInstance.result=result
  }


  onDelete(id:any){
    this.homeService.deleteProduct(id).subscribe({
      next:(response ) =>{
        console.log(response);
        window.alert("Product has been deleted");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error:(error) => {
        window.alert("The product has not been deleted");
      }

    })
  }
}
