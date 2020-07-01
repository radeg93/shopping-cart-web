import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartStoreService {
  private _cartItems = new BehaviorSubject<CartItem[]>([]);
  private _totalPrice = new BehaviorSubject<number>(0);

  public cartItems$ = this._cartItems.asObservable();
  public totalPrice$ = this._totalPrice.asObservable();

  get cartItems(): CartItem[] {
    return this._cartItems.getValue();
  }

  set cartItems(val: CartItem[]) {
    this._cartItems.next(val);
  }

  addProductToCart(cartItem: CartItem) {
    const item = this.cartItems.find((it) => it.name === cartItem.name);

    if (!item) {
      this.cartItems = [...this.cartItems, cartItem];
    }
  }

  removeProductFromCart(cartItem: CartItem) {
    this.cartItems = this.cartItems.filter((item) => item.id !== cartItem.id);
    this.updateTotalPrice();
  }

  updateItemCount(cartItem: CartItem, increase: boolean) {
    if (!(cartItem.count === 0 && !increase)) {
      const index = this.cartItems.indexOf(cartItem);
      this.cartItems[index] = {
        ...cartItem,
        count: increase ? cartItem.count + 1 : cartItem.count - 1,
      };
      this.updateTotalPrice();
    }
  }

  updateTotalPrice() {
    let total = 0;
    this.cartItems.forEach((it) => (total += it.price * it.count));
    this._totalPrice.next(total);
  }

  clearCart() {
    this.cartItems = [];
    this._totalPrice.next(0);
  }
}
