import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Payment } from "../models/payment.model";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  private _paymentForm = new BehaviorSubject<Payment>(new Payment());

  public shippingForm$ = this._paymentForm.asObservable();

  saveForm = (form: Payment) => this._paymentForm.next(form);

  getForm = () => this._paymentForm.getValue();

  clearForm = () => this._paymentForm.next(new Payment());
}
