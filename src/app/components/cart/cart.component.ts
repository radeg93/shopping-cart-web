import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { CartStoreService } from "src/app/services/cart-store.service";
import { Step } from "src/app/interfaces/step.interface";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  @Input() step: Step;

  cartItems$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;

  constructor(private cartStore: CartStoreService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartStore.cartItems$;
    this.cartStore.updateTotalPrice();
    this.cartItems$.subscribe((res) =>
      res.length ? (this.step.isValid = true) : (this.step.isValid = false)
    );
  }

  updateItemCount(item: CartItem, increase: boolean) {
    this.cartStore.updateItemCount(item, increase);
  }

  removeCartItem(item: CartItem) {
    this.cartStore.removeProductFromCart(item);
  }

  goToShipping() {
    // this.activeModal.close();
  }
}
