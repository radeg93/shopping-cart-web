import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Shipping } from "../models/shipping.model";

@Injectable({
  providedIn: "root",
})
export class ShippingService {
  private _shippingForm = new BehaviorSubject<Shipping>(new Shipping());

  public shippingForm$ = this._shippingForm.asObservable();

  saveForm = (form: Shipping) => this._shippingForm.next(form);

  getForm = () => this._shippingForm.getValue();

  clearForm = () => this._shippingForm.next(new Shipping());
}
