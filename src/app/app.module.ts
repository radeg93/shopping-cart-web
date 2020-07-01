import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularIbanModule } from "angular-iban";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CartComponent } from "./components/cart/cart.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ShippingComponent } from "./components/shipping/shipping.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { ModalWrapperComponent } from "./components/modal-wrapper/modal-wrapper.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { SuccessMsgComponent } from "./components/success-msg/success-msg.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ShippingComponent,
    PaymentComponent,
    ModalWrapperComponent,
    StepperComponent,
    SuccessMsgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    AngularIbanModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalWrapperComponent,
    CartComponent,
    StepperComponent,
    ShippingComponent,
    SuccessMsgComponent,
  ],
})
export class AppModule {}
