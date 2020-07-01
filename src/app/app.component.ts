import { Component, OnInit, OnDestroy } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { FormControl } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as uuid from "uuid";
import { ModalWrapperComponent } from "./components/modal-wrapper/modal-wrapper.component";
import { ProductsService } from "./services/products.service";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { CartStoreService } from "./services/cart-store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [DecimalPipe],
})
export class AppComponent implements OnInit, OnDestroy {
  sortDirection: "asc" | "desc" | "" = "";
  products: Product[];
  cartItems$: Observable<CartItem[]>;
  filteredProducts: Product[];
  filter = new FormControl("");
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private modalService: NgbModal,
    private productsService: ProductsService,
    private cartStore: CartStoreService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.searchProducts();
    this.cartItems$ = this.cartStore.cartItems$;
  }

  getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.products = res;
        this.filteredProducts = res;
      });
  }

  searchProducts() {
    this.filter.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(100), distinctUntilChanged())
      .subscribe((term) => {
        this.filteredProducts = this.products
          .filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
          )
          .sort((a, b) => {
            const res = this.compare(`${a.price}`, `${b.price}`);
            return this.sortDirection === "asc" || "" ? -res : res;
          });
      });
  }

  onSort(column) {
    this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
      const res = this.compare(`${a[column]}`, `${b[column]}`);
      return this.sortDirection === "asc" || "" ? res : -res;
    });
    this.sortDirection = this.sortDirection === "asc" || "" ? "desc" : "asc";
  }

  compare = (v1: string, v2: string) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

  openCart = () => this.modalService.open(ModalWrapperComponent);

  addToCart(product) {
    const cartItem: CartItem = {
      id: uuid.v4(),
      name: product.name,
      price: product.price,
      count: 1,
    };
    this.cartStore.addProductToCart(cartItem);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
