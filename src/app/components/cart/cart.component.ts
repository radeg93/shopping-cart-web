import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CartStoreService } from "src/app/services/cart-store.service";
import { Step } from "src/app/interfaces/step.interface";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, OnDestroy {
  @Input() step: Step;

  cartItems$: Observable<CartItem[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private cartStore: CartStoreService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartStore.cartItems$;
    this.cartStore.updateTotalPrice();
    this.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) =>
        res.length ? (this.step.isValid = true) : (this.step.isValid = false)
      );
  }

  updateItemCount(item: CartItem, increase: boolean) {
    this.cartStore.updateItemCount(item, increase);
  }

  removeCartItem(item: CartItem) {
    this.cartStore.removeProductFromCart(item);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
